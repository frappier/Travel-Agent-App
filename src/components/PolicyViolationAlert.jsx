import { FaExclamationTriangle } from 'react-icons/fa';

const PolicyViolationAlert = ({ violations }) => {
  if (!violations || violations.length === 0) return null;
  
  return (
    <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Policy Violation{violations.length > 1 ? 's' : ''}
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <ul className="list-disc pl-5 space-y-1">
              {violations.map((violation, index) => (
                <li key={index}>{violation}</li>
              ))}
            </ul>
          </div>
          <div className="mt-3">
            <div className="text-sm">
              <span className="font-medium text-yellow-800 hover:text-yellow-700">
                Requires manager approval
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyViolationAlert;
