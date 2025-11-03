import Link from "next/link";

function BuyGoods() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-xs">
      <div className="bg-green-600 px-3 py-2">
        <div className="flex items-center gap-1 justify-center">
          <span className="text-white text-lg font-bold">LIPA NA</span>
          <span className="text-white text-lg font-bold">M</span>
          <span className="text-white text-lg font-bold">-PESA</span>
        </div>
      </div>

      <div className="px-3 py-3">
        <div className="text-center mb-2">
          <h2 className="text-gray-800 font-semibold text-sm">
            BUY GOODS TILL NUMBER
          </h2>
        </div>

        <div className="flex justify-center gap-1 mb-2">
          {['4', '9', '5', '5', '8', '6', '6'].map((digit, index) => (
            <div
              key={index}
              className="w-7 h-8 border border-gray-600 rounded flex items-center justify-center bg-white"
            >
              <span className="text-sm font-bold text-gray-800">{digit}</span>
            </div>
          ))}
        </div>

        <div className="text-center mb-2">
          <h3 className="text-gray-800 font-semibold text-xs">
            UNO MSEAL
          </h3>
        </div>

        <div className="text-center">
          <p className="text-gray-600 text-xs">
            FOR MORE INFO. CALL +254 7126 3313 0
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MPesaTillCard() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-4">
          <BuyGoods />
          
          <div className="flex flex-row md:flex-col items-center">
            <div className="w-16 h-px md:w-px md:h-16 bg-gray-300"></div>
            <span className="px-2 py-1 text-sm text-gray-600 font-medium bg-white">OR</span>
            <div className="w-16 h-px md:w-px md:h-16 bg-gray-300"></div>
          </div>
          
          <div className="bg-linear-to-r from-primary to-gray-900 rounded-lg shadow-lg p-4 w-full max-w-xs transform hover:scale-105 transition-transform duration-200">
            <div className="text-center text-white">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">%</span>
                </div>
                <h3 className="font-bold text-lg">Get 20% OFF!</h3>
              </div>
              <p className="text-sm mb-3 opacity-90">
                Join membership for exclusive discounts
              </p>
              <Link 
                href='https://murangaseal.co.ke/'
                className="inline-block bg-white text-primary px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors duration-200"
              >
                Join Membership ›
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}