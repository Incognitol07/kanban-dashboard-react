import { CreditCard, Check, X, ChevronRight, CreditCardIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';

// Sample subscription plans
const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 9.99,
    billing: "monthly",
    features: [
      "Up to 5 projects",
      "Basic analytics",
      "24-hour support response time",
      "1GB storage"
    ],
    notIncluded: [
      "Advanced analytics",
      "Priority support",
      "Custom branding",
      "Team collaboration"
    ]
  },
  {
    id: "pro",
    name: "Professional",
    price: 19.99,
    billing: "monthly",
    popular: true,
    features: [
      "Up to 20 projects",
      "Advanced analytics",
      "12-hour support response time",
      "10GB storage",
      "Team collaboration up to 5 members"
    ],
    notIncluded: [
      "Custom branding",
      "API access",
      "Dedicated account manager"
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 49.99,
    billing: "monthly",
    features: [
      "Unlimited projects",
      "Full analytics suite",
      "4-hour support response time",
      "100GB storage",
      "Unlimited team collaboration",
      "Custom branding",
      "API access",
      "Dedicated account manager"
    ],
    notIncluded: []
  }
];

// Sample billing history
const billingHistory = [
  {
    id: "inv_1234",
    date: "2023-12-01",
    amount: 19.99,
    status: "Paid",
    description: "Professional Plan - Monthly"
  },
  {
    id: "inv_1233",
    date: "2023-11-01",
    amount: 19.99,
    status: "Paid",
    description: "Professional Plan - Monthly"
  },
  {
    id: "inv_1232",
    date: "2023-10-01",
    amount: 19.99,
    status: "Paid",
    description: "Professional Plan - Monthly"
  },
  {
    id: "inv_1231",
    date: "2023-09-01",
    amount: 9.99,
    status: "Paid",
    description: "Basic Plan - Monthly"
  }
];

export default function SubscriptionPage() {
  // Current plan (for demo purposes)
  const currentPlan = "pro";

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Subscription</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Plan */}
        <div className="lg:col-span-2">
          <div className="dashboard-card mb-6">
            <div className="dashboard-card-header">
              <h2 className="dashboard-card-title">Current Plan</h2>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                Professional
              </span>
            </div>
            
            <div className="mb-4">
              <div className="text-3xl font-bold mb-1 dark:text-white">$19.99<span className="text-base font-normal text-gray-500 dark:text-gray-400">/month</span></div>
              <p className="text-gray-600 dark:text-gray-300">Your plan renews on January 1, 2024</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2 dark:text-white">Usage</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-300">Projects</span>
                      <span className="font-medium dark:text-white">8 / 20</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: "40%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-300">Storage</span>
                      <span className="font-medium dark:text-white">4.2GB / 10GB</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: "42%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-300">Team Members</span>
                      <span className="font-medium dark:text-white">3 / 5</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2 dark:text-white">Payment Method</h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-8 bg-blue-500 rounded-md flex items-center justify-center text-white">
                    <CreditCardIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-medium dark:text-white">Visa ending in 4242</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Expires 12/2025</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Update Payment Method
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button variant="outline">Change Plan</Button>
              <Button variant="outline" className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 dark:text-red-400 dark:border-red-900 dark:hover:border-red-800">
                Cancel Subscription
              </Button>
            </div>
          </div>
          
          {/* Billing History */}
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <h2 className="dashboard-card-title">Billing History</h2>
              <Button variant="outline" size="sm">
                Download All
              </Button>
            </div>
            
            <div className="divide-y dark:divide-gray-700">
              {billingHistory.map(invoice => (
                <div key={invoice.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium dark:text-white">{invoice.description}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(invoice.date).toLocaleDateString()} • {invoice.id}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      invoice.status === "Paid" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                    }`}>
                      {invoice.status}
                    </span>
                    <div className="font-medium dark:text-white">${invoice.amount.toFixed(2)}</div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Available Plans */}
        <div className="lg:col-span-1">
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <h2 className="dashboard-card-title">Available Plans</h2>
            </div>
            
            <div className="space-y-4">
              {plans.map(plan => (
                <div 
                  key={plan.id} 
                  className={`border rounded-lg p-4 ${
                    plan.id === currentPlan 
                      ? "border-primary bg-primary/5" 
                      : "hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                  } ${plan.popular ? "relative" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      Popular
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg dark:text-white">{plan.name}</h3>
                    {plan.id === currentPlan && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-2xl font-bold dark:text-white">${plan.price}</span>
                    <span className="text-gray-500 dark:text-gray-400">/{plan.billing}</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.notIncluded.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 opacity-60">
                        <X className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                        <span className="text-gray-500 dark:text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant={plan.id === currentPlan ? "outline" : "default"} 
                    className="w-full"
                    disabled={plan.id === currentPlan}
                  >
                    {plan.id === currentPlan ? "Current Plan" : "Upgrade"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
