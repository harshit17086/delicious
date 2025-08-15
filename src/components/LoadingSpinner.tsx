export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center space-y-8">
        {/* Animated loading rings */}
        <div className="relative">
          <div className="w-20 h-20 border-4 border-orange-200 dark:border-orange-800 rounded-full"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-2 left-2 w-16 h-16 border-4 border-red-200 dark:border-red-800 rounded-full"></div>
          <div
            className="absolute top-2 left-2 w-16 h-16 border-4 border-red-400 border-t-transparent rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>

          {/* Central cooking icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl animate-bounce">🍳</span>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-xl font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Cooking up something delicious...
          </p>
          <p className="text-gray-600 dark:text-gray-400 animate-pulse">
            Finding the perfect recipes for you
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce"></div>
          <div
            className="w-3 h-3 bg-red-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
