import { Link } from "react-router-dom";

const AdmissionGuidelines = () => {
  return (
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-8 min-h-screen">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#9c231b] text-center">
          Admission Guidelines
        </h2>

        {/* Required Documents */}
        <section className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-xl font-semibold mb-2 sm:mb-4">
            Required Documents
          </h3>
          <ul className="list-disc pl-4 sm:pl-5 text-sm sm:text-base text-gray-700">
            <li>Passport-sized Photo (JPG, JPEG, PNG Allowed)</li>
            <li>Previous Academic Marksheet (JPG, JPEG, PNG, PDF Allowed)</li>
            <li>
              School/College Leaving Certificate (JPG, JPEG, PNG, PDF Allowed)
            </li>
            <li>Aadhar Card (JPG, JPEG, PNG, PDF Allowed)</li>
          </ul>
        </section>

        {/* Steps in the Admission Process */}
        <section className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-xl font-semibold mb-2 sm:mb-4">
            Steps in the Admission Process
          </h3>
          <ol className="list-decimal pl-4 sm:pl-5 text-sm sm:text-base text-gray-700 space-y-2">
            <li>
              <span className="font-medium">Step 1:</span> Fill out the
              admission form online and upload the required documents.
            </li>
            <li>
              <span className="font-medium">Step 2:</span> Bring hard copies of
              the documents to the college premises and submit them.
            </li>
            <li>
              <span className="font-medium">Step 3:</span> Admin reviews the
              documents. Upon approval, fee payment is enabled.
            </li>
            <li>
              <span className="font-medium">Step 4:</span> Pay fees through the
              portal and download the payment receipt.
            </li>
          </ol>
        </section>

        {/* Additional Notes */}
        <section>
          <h3 className="text-base sm:text-xl font-semibold mb-2 sm:mb-4">
            Important Notes
          </h3>
          <ul className="list-disc pl-4 sm:pl-5 text-sm sm:text-base text-gray-700">
            <li>Ensure all documents are original and valid.</li>
            <li>Fee payment is available after document verification.</li>
            <li>
              Visit the{" "}
              <Link to="/admission/help" className="underline inline-flex">
                Help & Support
                <svg
                  aria-hidden="true"
                  fill="none"
                  focusable="false"
                  height="12"
                  shape-rendering="geometricPrecision"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="12"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14L21 3"></path>
                </svg>
              </Link>{" "}
              section for FAQs.
            </li>
          </ul>
        </section>
      </div>
  );
};

export default AdmissionGuidelines;
