import { Shield } from "lucide-react";

const RERABadge = () => {
  return (
    <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
      <Shield className="w-5 h-5 text-primary" />
      <div className="flex flex-col">
        <span className="text-xs text-gray-600 font-medium">RERA Approved</span>
        <span className="text-sm font-bold text-primary">TN/01/Building/0072/2018</span>
      </div>
    </div>
  );
};

export default RERABadge;
