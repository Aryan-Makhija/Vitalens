# Vitalens 

> AI-Powered Early Health Diagnosis & Wellness Monitoring Platform

## Overview

**Vitalens** is an AI-driven early health diagnosis and wellness monitoring system designed to identify potential health concerns before they become severe. The platform analyzes a user's daily health vitals, lifestyle patterns, symptoms, and medical background to generate personalized health insights, risk assessments, and improvement plans.

Unlike traditional symptom checkers, Vitalens follows a multi-layer diagnostic pipeline that continuously evaluates user-provided health information, detects inconsistencies, requests additional context when required, and classifies users into risk categories for safer and more reliable health assessment.

The system combines preventive healthcare, intelligent risk stratification, personalized wellness planning, and human-doctor escalation mechanisms to provide a safer healthcare experience.

---

# 🚀 Key Objectives

* Enable early detection of potential health issues.
* Monitor lifestyle and wellness indicators.
* Generate AI-powered health assessment reports.
* Provide personalized improvement recommendations.
* Prevent unsafe AI-generated advice in critical cases.
* Escalate high-risk users to healthcare professionals.
* Track progress through structured wellness plans.
* Maintain diagnosis history and recovery reports.

---

# 🏗️ System Workflow

## Phase 1: Initial Health Assessment

The user begins by submitting basic health and lifestyle information.

### Collected Data

#### Health Vitals

* Age
* Sleep Duration
* Bedtime Schedule
* Hydration Levels
* Daily Wellness Indicators

#### Symptom Description

A free-text section where users can describe:

* Current health concerns
* Symptoms
* Physical discomfort
* Emotional state
* General feelings

Example:

> "I have been feeling tired lately, experiencing headaches, and sleeping poorly for the last few days."

---

## Phase 2: AI Preliminary Analysis

The AI engine performs an initial analysis by:

* Evaluating vital metrics.
* Understanding symptom descriptions.
* Identifying abnormalities.
* Detecting inconsistencies between reported symptoms and lifestyle habits.
* Estimating risk levels.

If the available information is insufficient, Vitalens automatically proceeds to collect additional medical context.

---

## Phase 3: Background Health Evaluation

Additional information may be requested, including:

### Medical History

* Past Injuries
* Previous Illnesses
* Chronic Conditions
* Ongoing Medications
* Recovery History

The newly collected data is merged with the initial assessment and analyzed again for improved diagnostic accuracy.

---

## Phase 4: Risk Classification Engine

After comprehensive analysis, users are categorized into one of three health risk levels:

### 🟢 Green Zone — Safe

Indicates:

* No significant health concerns detected.
* Lifestyle metrics are within acceptable ranges.
* User can continue monitoring and maintaining healthy habits.

### 🟡 Yellow Zone — Under Observation

Indicates:

* Potential health concerns detected.
* Lifestyle adjustments may be required.
* User is eligible for a personalized wellness improvement plan.

### 🔴 Red Zone — Critical

Indicates:

* High-risk health indicators detected.
* Immediate medical attention may be required.
* AI recommendations are intentionally restricted.

At this stage, Vitalens activates the escalation system and refers the user to a qualified healthcare professional.

---

# 🛡️ Safety-First Escalation System

Vitalens prioritizes user safety.

When a user falls into the **Red Zone**:

* AI-generated treatment recommendations are stopped.
* No self-medication suggestions are provided.
* No recovery plans are generated.
* The case is escalated for professional medical consultation.

This reduces the risk of unsafe AI-driven medical guidance.

---

# 📄 AI Health Report Generation

After diagnosis, Vitalens generates a comprehensive report containing:

### Report Components

* Overall Health Summary
* Identified Risk Factors
* Lifestyle Analysis
* Symptom Evaluation
* Diagnostic Findings
* Health Risk Classification
* Personalized Recommendations
* Areas Requiring Attention
* Suggested Next Steps

---

# 📅 Personalized 7-Day Wellness Plan

Users categorized in the **Yellow Zone** receive a structured improvement plan.

### Plan Features

* Daily wellness goals
* Hydration recommendations
* Sleep optimization tasks
* Lifestyle improvement suggestions
* Progress tracking

The objective is to help users improve health indicators before conditions worsen.

---

# 🔒 Diagnosis Loop Prevention

To maintain accurate evaluations and prevent misuse:

* Users enrolled in an active wellness plan cannot start a new diagnosis.
* New assessments become available only after plan completion.
* This ensures that improvement recommendations are followed consistently.

---

# 📝 Feedback & Reassessment System

After completing the 7-day wellness plan:

Users submit a feedback report containing:

* Recovery status
* Symptom improvements
* Lifestyle changes
* Overall experience

The AI engine then:

1. Compares the new data with previous reports.
2. Evaluates improvement trends.
3. Generates a follow-up assessment.
4. Creates a comparative progress report.

---

# 📊 Dashboard Features

Vitalens provides a centralized user dashboard.

### Dashboard Modules

#### Latest Diagnosis Report

View the most recent health assessment and risk classification.

#### Weekly Wellness Plans

Track active and completed wellness programs.

#### Diagnosis History

Access all previous diagnosis records.

#### Feedback Reports

Review wellness plan outcomes and progress evaluations.

#### Health Analytics

Monitor improvement trends and assessment history.

---

# 🎯 Core Features

* AI-powered health assessment
* Multi-stage diagnostic pipeline
* Symptom and lifestyle analysis
* Medical history evaluation
* Risk classification engine
* Automated report generation
* Personalized wellness plans
* Progress tracking
* Feedback-based reassessment
* Diagnosis history management
* Human-doctor escalation workflow
* Secure authentication
* Modern responsive dashboard

---

# 🧠 AI Architecture

## Layer 1: Lifestyle Analysis

Evaluates:

* Sleep patterns
* Hydration
* Daily habits
* Wellness indicators

## Layer 2: Symptom Understanding

Processes:

* User descriptions
* Health concerns
* Symptom narratives

## Layer 3: Medical Context Analysis

Analyzes:

* Previous illnesses
* Injury history
* Medication records

## Layer 4: Risk Classification

Assigns:

* Green
* Yellow
* Red

## Layer 5: Recommendation Engine

Generates:

* Reports
* Improvement plans
* Follow-up assessments

## Layer 6: Safety Escalation Layer

Handles:

* Critical-risk detection
* AI recommendation restrictions
* Human-doctor referrals

---

# 🛠️ Tech Stack

### Frontend

* Next.js
* React
* Javascript
* Tailwind CSS
* ShadCN UI

### Authentication

* Clerk Authentication

### AI

* Google Gemini API

### Database

* PostgreSQL / Neon Database

### ORM

* drizzle ORM

### Deployment

* Vercel

---

# 📂 Project Structure

```bash
vitalens/
│
├── app/
│   ├── dashboard/
│   ├── diagnosis/
│   ├── reports/
│   ├── wellness-plan/
│   ├── feedback/
│   └── auth/
│
├── components/
│   ├── dashboard/
│   ├── diagnosis/
│   ├── reports/
│   ├── forms/
│   └── shared/
│
├── lib/
│   ├── database/
│   └── utils/
|___
```

# ⚙️ Environment Variables

Create a `.env` file in the root directory.

```env
# Database
DATABASE_URL=

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Gemini AI
GEMINI_API_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

# 🚀 Installation

## 1. Clone Repository

```bash
git clone <repository-url>
```

```bash
cd vitalens
```

---

## 2. Install Dependencies

```bash
npm install
```

or

```bash
pnpm install
```

---

## 3. Configure Environment Variables

Create the `.env` file and add all required credentials.


## 4. Start Development Server

```bash
npm run dev
```

Application will start on:

```bash
http://localhost:3000
```

---

# 📈 Future Enhancements

* Wearable device integration
* Smartwatch health tracking
* Real-time monitoring
* Doctor appointment scheduling
* Telemedicine integration
* Health trend prediction
* Personalized nutrition plans
* Multi-language support
* Health score system
* Emergency alert mechanism

---

# ⚠️ Medical Disclaimer

Vitalens is an early-stage health assessment and wellness monitoring platform intended for informational and preventive healthcare purposes only.

The platform does not replace professional medical diagnosis, treatment, or emergency healthcare services. Users experiencing severe symptoms or classified under the Critical (Red) category should consult qualified healthcare professionals immediately.

---
Built with ❤️ by Aryan Makhija to make preventive healthcare more accessible, intelligent, and safer through responsible AI.
