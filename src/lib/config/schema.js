

import { uuid, boolean, integer, json, jsonb, pgTable, real, text, time, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  isUserEnrolled: boolean().default(false)
});



export const form1Table = pgTable("form1", {

  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  age: integer().notNull(),
  gender: varchar().notNull(),

  bedtime: time().notNull(),
  wakeUpTime: time().notNull(),
  sleepQuality: integer().notNull(), // 1–5

  activityLevel: varchar().notNull(),
  steps: integer().notNull(),

  foodQuality: varchar().notNull(),


  waterIntake: integer().notNull(),

  stresslevel: integer().notNull(),
  mood: varchar().notNull(),
  energylevel: integer().notNull(),

  healthDescription: text().notNull(),

  createdAt: timestamp().defaultNow().notNull(),

  userEmail: varchar("userEmail").references(() => usersTable.email).notNull()

})



export const layer1ResultsTable = pgTable("layer1_results", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  // 🔗 Reference
  form1Id: integer()
    .references(() => form1Table.id)
    .notNull(),

  userEmail: varchar()
    .references(() => usersTable.email)
    .notNull(),

  // 🧮 Normalization output (internal use)
  normalizedScores: json().notNull(),
  /*
    Example:
    {
      sleep: 0.8,
      activity: 0.4,
      food: 0.6,
      hydration: 0.3,
      stress: 0.7,
      energy: 0.2
    }
  */

  // ⚖️ Habit balance & mismatches
  habitBalanceScore: real().notNull(), // 0–1
  detectedMismatches: json(),
  /*
    Example:
    [
      {
        type: "sleep_energy",
        description: "Good sleep but low energy",
        severity: "medium"
      }
    ]
  */

  // 🧠 Free-text interpretation
  freeTextAnalysis: json().notNull(),
  /*
    Example:
    {
      sentiment: "negative",
      severity: "medium",
      concernType: "mental",
      redFlagPhrases: ["burnt out", "can't cope"]
    }
  */

  // 🚨 Risk signals (NOT advice)
  severityLevel: varchar().notNull(), // low | medium | high
  concernType: varchar().notNull(),   // physical | mental | both
  redFlagDetected: boolean().notNull(),

  // 🎯 Confidence & clarity
  interpretationConfidence: real().notNull(), // 0–1
  needsMoreContext: boolean().notNull(),

  // 🧩 Form 2 decision
  form2Required: boolean().notNull(),
  requiredContextModules: json(),
  /*
    Example:
    ["stress", "medical"]
  */

  // 🚦 Layer 1 status hint (NOT final decision)
  layer1Status: varchar().notNull(),
  /*
    GREEN  → balanced, confident
    YELLOW → unclear, uneven, low confidence
    RED    → high severity or red flags
  */

  createdAt: timestamp().defaultNow().notNull()
});



export const form2Table = pgTable("form2", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  // 🔗 References
  form1Id: integer()
    .references(() => form1Table.id)
    .notNull(),

  userEmail: varchar()
    .references(() => usersTable.email)
    .notNull(),

  /* ─────────────────────────────
     🔹 MODULE 1: General Health Safety
     ───────────────────────────── */

  hasOngoingCondition: boolean(),

  conditionTypes: json(),
  /*
    Array of:
    [
      "joint_pain",
      "muscle_injury",
      "back_neck_issue",
      "chronic_condition",
      "recent_illness",
      "other"
    ]
  */

  conditionOtherText: varchar(),

  /* ─────────────────────────────
     🔹 MODULE 2: Pain & Physical Limitation
     ───────────────────────────── */

  painSeverity: varchar(),
  // none | mild | moderate | severe

  painLocations: json(),
  /*
    Array of:
    [
      "lower_back",
      "knees",
      "shoulders",
      "neck",
      "other"
    ]
  */

  painAffectsMovement: boolean(),

  /* ─────────────────────────────
     🔹 MODULE 3: Stress & Mental Load
     ───────────────────────────── */

  stressType: varchar(),
  // mental | emotional | physical

  stressDuration: varchar(),
  // <1_week | 1_4_weeks | >1_month

  /* ─────────────────────────────
     🔹 MODULE 4: Medical / Lifestyle Context
     ───────────────────────────── */

  recoveringFromIllness: boolean(),
  onMedicationAffectingEnergy: boolean(),
  managingLongTermCondition: boolean(),
  preferNotToSayMedical: boolean(),

  createdAt: timestamp().defaultNow().notNull()
});







//1️⃣ layer2_reports (core table)
export const layer2Reports = pgTable("layer2_reports", {
  id: uuid("id").defaultRandom().primaryKey(),


  userEmail: varchar()
    .references(() => usersTable.email)
    .notNull(),

  form1Id: integer()
    .references(() => form1Table.id)
    .notNull(),
  form2Id: integer()
    .references(() => form2Table.id),


  layer1ResultId: integer()
    .references(() => layer1ResultsTable.id)
    .notNull(),

  overallPattern: text("overall_pattern").notNull(),
  primaryConcernDomain: text("primary_concern_domain"), // physical | mental | both
  secondaryConcernDomain: text("secondary_concern_domain"),

  trendDirection: text("trend_direction"), // improving | stable | declining
  contextCompleteness: text("context_completeness"), // low | medium | high

  overallConfidence: real("overall_confidence").notNull(), // 0–1
  needsMoreData: boolean("needs_more_data").default(false),

  toneGuidance: text("tone_guidance").notNull(), // reassuring | cautious | neutral

  systemFlags: jsonb("system_flags"),
  // { watchClosely: true, earlyEscalationPossible: false }
  status: text("status").notNull(),
  // green | yellow | red

  statusReason: text("status_reason").notNull(),
  // short human-readable explanation

  escalationRisk: text("escalation_risk"),
  // none | possible | immediate


  createdAt: timestamp("created_at").defaultNow().notNull()
});


// positive signals

export const layer2PositiveSignals = pgTable("layer2_positive_signals", {
  id: uuid("id").defaultRandom().primaryKey(),

  reportId: uuid("report_id")
    .references(() => layer2Reports.id)
    .notNull(),


  userEmail: varchar()
    .references(() => usersTable.email)
    .notNull(),



  signal: text("signal").notNull(), // e.g. "consistent sleep"
  strength: text("strength").notNull(), // low | medium | high
  confidence: real("confidence").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull()
});


// Purpose

// Enables positive reinforcement

// Prevents negative-only feedback

// Keeps tone balanced


//Concern areas
export const layer2ConcernAreas = pgTable("layer2_concern_areas", {
  id: uuid("id").defaultRandom().primaryKey(),

  reportId: uuid("report_id")
    .references(() => layer2Reports.id)
    .notNull(),


  userEmail: varchar()
    .references(() => usersTable.email)
    .notNull(),


  area: text("area").notNull(), // "low energy", "high stress"
  severity: text("severity").notNull(), // mild | moderate | high
  possibleDrivers: jsonb("possible_drivers"),
  confidence: real("confidence").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Important design choice

// ❌ No diagnosis

// ❌ No conditions

// ✅ “areas of attention”

// This protects you legally and architecturally.


//Suggestion Blocked

export const layer2Suggestions = pgTable("layer2_suggestions", {
  id: uuid("id").defaultRandom().primaryKey(),

  reportId: uuid("report_id")
    .references(() => layer2Reports.id)
    .notNull(),



  userEmail: varchar()
    .references(() => usersTable.email)
    .notNull(),


  suggestion: text("suggestion").notNull(),
  suggestionType: text("suggestion_type").notNull(),
  // behavioral | physical | recovery | lifestyle

  status: text("status").notNull(),
  // allowed | blocked

  riskLevel: text("risk_level").notNull(), // low | medium | high
  reason: text("reason"), // why blocked / limited

  requiresFollowUp: boolean("requires_follow_up").default(false),

  createdAt: timestamp("created_at").defaultNow().notNull()
});


//This is the safety contract between AI and backend.

// weekly plan candidate

export const layer2WeekPlanCandidates = pgTable(
  "layer2_week_plan_candidates",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    reportId: uuid("report_id")
      .references(() => layer2Reports.id)
      .notNull(),


    userEmail: varchar()
      .references(() => usersTable.email)
      .notNull(),

    planType: text("plan_type").notNull(),
    // stabilization | recovery | balance

    goalFocus: text("goal_focus").notNull(),
    // energy | stress | sleep | activity

    difficultyLevel: text("difficulty_level").notNull(),
    // low | medium

    dailyActions: jsonb("daily_actions").notNull(),
    // ["10 min walk", "fixed bedtime", "stress check-in"]

    safetyLevel: text("safety_level").notNull(), // high only

    //Check  is user has enrolled in the plan or not 
    isUserEnrolled: boolean().default(false),

    // start date  of plan
    startedAt: timestamp(),

    //Plan is completed or not 
    isCompleted: boolean().default(false),

    //IS FeedbackForm Filled for this Weeklyplan or not 
    isFeedBackCompleted:boolean().default(false),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  }
);


// -----------------------
// Final Layer Schema
// -----------------------

export const finalResultsTable = pgTable("final_results", {
  id: uuid("id").defaultRandom().primaryKey(),

  userEmail: varchar()
    .references(() => usersTable.email)
    .notNull(),

  layer2ReportId: uuid()
    .references(() => layer2Reports.id)
    .notNull(),

  // ----------------------------------
  // GOVERNANCE STATUS
  // ----------------------------------

  finalStatus: text("final_status").notNull(),
  // green | yellow | red

  escalationTriggered: boolean("escalation_triggered").default(false),

  escalationLevel: text("escalation_level"),
  // none | advisory | immediate

  // ----------------------------------
  // OFFICIAL COMMUNICATION
  // ----------------------------------

  statusHeadline: text("status_headline").notNull(),

  statusSummary: text("status_summary").notNull(),

  // ----------------------------------
  // PERMISSION FLAGS (CRITICAL PART)
  // ----------------------------------

  showConcerns: boolean("show_concerns").default(false),

  showPositives: boolean("show_positives").default(false),

  showSuggestions: boolean("show_suggestions").default(false),

  showWeeklyPlan: boolean("show_weekly_plan").default(false),

  // ----------------------------------
  // TRACEABILITY
  // ----------------------------------

  ruleVersion: text("rule_version").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


export const weeklyFeedbackFormTable = pgTable("weekly_feedback_form", {
  id: uuid("id").defaultRandom().primaryKey(),

  // 🔹 Link to user
  userEmail: varchar()
    .references(() => usersTable.email)
    .notNull(),

  // 🔹 Link to weekly plan
  weekPlanId: uuid().references(() => layer2WeekPlanCandidates.id).notNull(),

  // 🔹 Link to baseline Layer2 report
  layer2ReportId: uuid()
    .references(() => layer2Reports.id)
    .notNull(),

  // =====================================================
  // 🟢 USER FILLED FIELDS
  // =====================================================

  feedbackText: text("feedback_text").notNull(),

  energyLevel: real("energy_level"),        // 1–5
  stressLevel: real("stress_level"),        // 1–5
  sleepQuality: real("sleep_quality"),      // 1–5
  hydrationLevel: real("hydration_level"),  // 1–5
  activityLevel: real("activity_level"),    // 1–5

  adherenceScore: real("adherence_score"),  // 1–5 (how consistently followed plan)

  // =====================================================
  // 🔵 AI GENERATED COMPARISON RESULTS
  // =====================================================

  sentiment: text("sentiment"), // positive | neutral | negative
  overallTrend: text("overall_trend"), // improving | stable | declining
  redFlagDetected: boolean("red_flag_detected"),

  concernComparisons: jsonb("concern_comparisons"),
  // [
  //   { area, previousSeverity, currentState }
  // ]

  positiveSignalComparisons: jsonb("positive_signal_comparisons"),
  // [
  //   { signal, previousStrength, currentState }
  // ]

  newStatus: text("new_status"), // GREEN | YELLOW | RED
  escalationRequired: boolean("escalation_required"),
  comparisonReasoning: text("comparison_reasoning"),

  createdAt: timestamp("created_at").defaultNow().notNull()
});


// History schema
export const diagnosisHistory = pgTable("diagnosis_history", {
  id: uuid("id").defaultRandom().primaryKey(),

  // 🔹 Link to the user
  userEmail: varchar("user_email")
    .references(() => usersTable.email)
    .notNull(),

  // 🔹 Link to the original Layer2 report
  layer2ReportId: uuid("layer2_report_id")
    .references(() => layer2Reports.id)
    .notNull(),

  finalResultsId: uuid().references(() => finalResultsTable.id).notNull(),
  weeklyFeedbackFormId: uuid().references(() => weeklyFeedbackFormTable.id),


  finalStatus: text("final_status").notNull(),

  statusHeadline: text("status_headline").notNull(),

  statusSummary: text("status_summary").notNull(),

  comparisonReasoning: text("comparison_reasoning"),


  // 🔹 Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});