import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';

export default function PasswordStrengthMeter({ password }) {
    // Use zxcvbn to analyze the password
    const testResult = zxcvbn(password);
  
    const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  
    const getStrengthLabel = () => {
      return strengthLabels[testResult.score];
    };
  
    const getStrengthColor = () => {
      switch (testResult.score) {
        case 0:
          return 'bg-red-500';
        case 1:
          return 'bg-orange-500';
        case 2:
          return 'bg-yellow-500';
        case 3:
          return 'bg-blue-500';
        case 4:
          return 'bg-green-500';
        default:
          return 'bg-gray-500';
      }
    };
  
    return (
      <div className="mt-2">
        <div className="text-sm">Strength: {getStrengthLabel()}</div>
        <div className="w-full bg-gray-300 rounded">
          <div
            className={`h-2 rounded ${getStrengthColor()}`}
            style={{ width: `${(testResult.score + 1) * 20}%` }}
          ></div>
        </div>
        {password && (
          <div className="text-xs mt-1 text-gray-500">
            {testResult.feedback.suggestions.join(' ')}
          </div>
        )}
      </div>
    );
  }