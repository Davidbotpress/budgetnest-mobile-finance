BudgetNest - MasterplanApp Overview and ObjectivesBudgetNest is a minimalist, mobile-first budgeting and expense tracking web app designed specifically for students and young people living in Spain who are managing a monthly allowance. The app aims to provide a simple, intuitive experience that empowers users to understand and control their spending, stay within budget, and build better financial habits.
Target AudienceStudents living in Spain (often on a limited allowance)
Young people new to personal finance
Budget-conscious individuals seeking simple tools in Spanish and Euro currency
Core Features and FunctionalityWelcome Page with intro and CTA to sign in or register
Authentication via email/password and Google OAuth
Dashboard showing total monthly budget, amount spent, remaining balance, and category cards
Expense Log listing all transactions with edit/delete options
Statistics Page with graphs and alerts
AI-Powered Features (Premium Roadmap):
Auto-categorization of expenses
Smart savings plan generator based on goals and income
High-Level Technical Stack RecommendationsFrontend: Vite + TypeScript + React, Tailwind CSS, shadcn/ui components
Backend: Supabase (auth, database, storage)
Authentication: Supabase Auth (email/password + Google OAuth)
Localization: Spanish-only UI, Euro as currency
Conceptual Data ModelUser: id, email, name, auth method
Budget: user_id, total_amount for the month
Category: id, name (e.g., Food, Transport), color
Expense: id, user_id, category_id, amount, name, date
AI Settings (Premium): user_id, savings_goal, income, recommendations
User Interface Design PrinciplesMobile-first, responsive layouts
Card-based, whitespace-heavy structure
Clear visual hierarchy using Inter font
Consistent color palette:
Primary: #0D1B2A (Dark Blue)
Accent: #FFFFFF (White)
Backgrounds: white and soft gray tones
Security ConsiderationsSecure Supabase auth integration
Role-based access where applicable (especially for premium features)
Input validation and sanitation on all forms
HTTPS-only communications
Development Phases or MilestonesMVP Phase
Core pages: Welcome, Login/Register, Dashboard, Expense Log, Statistics
Supabase integration and user auth
V1 Launch
Polish UI and UX
Add data visualizations and category progress bars
Premium Roadmap
AI-based auto-categorization and savings planner
Stripe or Supabase paid tier integration
Potential Challenges and SolutionsReal-time updates: Use Supabase subscriptions if needed
Category management UI: Pre-define categories for MVP
AI integration: Scope and limit features to manageable MVP additions
Future Expansion PossibilitiesMulti-currency support
Language localization for other markets
Community savings challenges
Mobile app version (PWA or native)
