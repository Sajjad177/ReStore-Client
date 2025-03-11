import { Package, Calendar, Truck } from "lucide-react";

const WorkSection = () => {
  return (
    <div>
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          {/* Section Title */}
          <h2 className="text-center text-3xl font-bold text-gray-700 dark:text-white mb-6">
            How it works
          </h2>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center space-y-3">
              <Calendar className="w-12 h-12 text-gray-700 dark:text-white" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Enter Your Due Date
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">
                Enter your due date in the form, and we’ll tell you which boxes
                are right for you!
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center space-y-3">
              <Package className="w-12 h-12 text-gray-700 dark:text-white" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Select Your Boxes
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">
                Try your box, fit, durability, and price. Add them to your cart
                and let us know when we should send them.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center space-y-3">
              <Truck className="w-12 h-12 text-gray-700 dark:text-white" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                We Deliver
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">
                We’ll get the perfect box to your doorstep before your baby
                arrives, right when you need it.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkSection;
