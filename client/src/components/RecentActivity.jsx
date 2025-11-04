import React from "react";
import { Clock, User, Database } from "lucide-react";

export default function RecentActivity({ activities }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-indigo-500" />
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
          Recent Activity
        </h2>
      </div>

      {/* List */}
      <ul className="divide-y divide-gray-100">
        {activities.map((a) => (
          <li
            key={a._id}
            className="py-4 hover:bg-gray-50 rounded-lg transition-all duration-150 px-3"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                {/* Actor & Action */}
                <p className="text-sm sm:text-base font-medium text-gray-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="font-semibold text-gray-800">
                    {a.actor}
                  </span>
                  <span className="text-gray-600 font-normal">
                    — {a.action}
                  </span>
                </p>

                {/* Entity Info */}
                {a.entity && (
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1 sm:gap-2">
                    <Database className="w-3 h-3 text-gray-400 shrink-0" />
                    <span className="font-mono text-[11px] sm:text-xs tracking-tight">
                      {a.entity}: {a.entityId}
                    </span>
                  </p>
                )}
              </div>

              {/* Timestamp */}
              <span className="text-[11px] sm:text-xs text-gray-400 mt-1 whitespace-nowrap ml-4">
                {new Date(a.timestamp).toLocaleString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
