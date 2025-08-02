import React from "react";
import OurCustomer from "../common/OurCustomer.js";

const Clients = () => {
  return (
    <div>
      <section>
        <div className="py-24">
          <div className="flex items-center justify-center text-center mt-8 mb-2 lg:mt28">
            <div className="flex flex-col items-center justify-center rounded-tr-full rounded-bl-full w-full bg-white py-6">
              <div className="flex flex-col m-2 max-w-7xl">
                <p className="text-2xl md:text-3xl text-black font-semibold font-poppins mb-4">
                  Top companies #Hiring
                </p>
              </div>

              <div className="mx-auto text-center">
                <div className="grid grid-cols-2 gap-4 mx-auto lg:grid-cols-5">
                  <div>
                    <img
                      className="h-4 mx-auto lg:h-12"
                      src="https://d33wubrfki0l68.cloudfront.net/5a364f2e7cfeadd0f603cdfeda83f5cd0509770d/3f0ae/images/logos/logoone.svg"
                      alt="Figma"
                    />
                  </div>
                  <div>
                    <img
                      className="h-4 mx-auto lg:h-12"
                      src="https://d33wubrfki0l68.cloudfront.net/ab0d1eeefb9cddb55f05f1601b2ae3fbae9317a9/5bfbe/images/logos/logotwo.svg"
                      alt="Framer"
                    />
                  </div>
                  <div>
                    <img
                      className="h-4 mx-auto lg:h-12"
                      src="https://d33wubrfki0l68.cloudfront.net/2fea2d550675d7cf3bb77a515487bce6c086051b/951f5/images/logos/logothree.svg"
                      alt="Sketch "
                    />
                  </div>
                  <div>
                    <img
                      className="h-4 mx-auto lg:h-12"
                      src="https://d33wubrfki0l68.cloudfront.net/f9b8da8b1442382848d30275dc2d0337d14a04c9/dc8f4/images/logos/logofour.svg"
                      alt="Sketch "
                    />
                  </div>
                  <div>
                    <img
                      className="h-4 mx-auto lg:h-12"
                      src="https://d33wubrfki0l68.cloudfront.net/07ddf740e29509004147c6a83c09f299366546c9/03a26/images/logos/logofive.svg"
                      alt="Invision"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <OurCustomer />
        </div>
      </section>
    </div>
  );
};

export default Clients;
