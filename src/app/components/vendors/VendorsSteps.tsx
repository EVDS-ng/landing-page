import Link from "next/link";

export default function VendorsSteps() {
  const steps = [
    {
      num: 1,
      title: "Register your business",
      desc: "Fill up the registration form including identity documents, guarantors details, etc."
    },
    {
      num: 2,
      title: "Verification",
      desc: "We take a minimum of two weeks to reference check all information shared by you & your team"
    },
    {
      num: 3,
      title: "Start getting jobs",
      desc: "Setup your dashboard back office to receive booking notices, manage jobs and receive payments"
    }
  ];

  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 gap-6">
          <div className="bg-yellow-50 text-yellow-600 border border-yellow-100 px-4 py-1.5 rounded-full text-sm font-semibold">
            🌟 How it works
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 max-w-2xl">
            Three Simple Steps to Start Accepting Bookings
          </h2>
          
          <Link 
            href="/vendor/register" 
            className="inline-block mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3.5 rounded-full transition-colors shadow-sm"
          >
            Become a vendor
          </Link>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {steps.map((step) => (
            <div 
              key={step.num}
              className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex flex-col gap-6"
            >
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-gray-900 text-xl">
                {step.num}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed font-medium text-[15px]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
