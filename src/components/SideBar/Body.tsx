import * as React from "react";

interface Props {
  children: React.ReactElement[] | React.ReactElement;
}

export default function SideBarBody({ children }: Props) {
  return (
    <div>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 pt-20 h-screen transition-transform -translate-x-full bg-stone-600 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        {/* Replace the <p> tag with an <img> tag for your logo */}
        <img // eslint-disable-line
          src="data:image/jpeg;base64,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" // Replace with the actual path to your logo image
          alt="Logo"
          className="mx-8 mb-4"
          style={{ maxWidth: "20%", borderRadius: 20 }} // Adjust the size as needed
        />

        <div className="h-full px-3 pb-4 overflow-y-auto mt-5 bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">{children}</ul>
        </div>
      </aside>

      <footer className="fixed bottom-0 left-0 z-40 w-full h-16 bg-white border-t border-gray-200 sm:hidden dark:bg-gray-800 dark:border-gray-700">
        <div className="h-full px-3 pt-4 overflow-x-auto bg-white dark:bg-gray-800">
          <ul className="flex justify-center space-x-4 font-medium">
            {children}
          </ul>
        </div>
      </footer>
    </div>
  );
}
