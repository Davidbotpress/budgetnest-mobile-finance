
import FeatureCard from './FeatureCard';
import { CircleDollarSign, FileText, Settings, User } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: CircleDollarSign,
      title: "Smart Budget Tracking",
      description: "Set monthly budgets by category and track your spending in real-time with visual progress indicators.",
      delay: "0s"
    },
    {
      icon: FileText,
      title: "Expense Logging",
      description: "Quickly log expenses with our intuitive interface. Edit, delete, and categorize transactions effortlessly.",
      delay: "0.1s"
    },
    {
      icon: Settings,
      title: "Detailed Analytics",
      description: "Get insights into your spending patterns with beautiful charts and identify areas for improvement.",
      delay: "0.2s"
    },
    {
      icon: User,
      title: "Student-Focused",
      description: "Designed specifically for international students and young professionals managing monthly allowances.",
      delay: "0.3s"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-budget-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Everything You Need to
            <span className="text-gradient block">Manage Your Budget</span>
          </h2>
          <p className="text-xl text-budget-gray-600 max-w-2xl mx-auto">
            BudgetNest provides all the tools you need to take control of your finances and build healthy spending habits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
