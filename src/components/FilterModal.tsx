import { useState } from 'react';
import { X, Calendar, Users, Clock } from 'lucide-react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

export interface FilterOptions {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  department: string;
  gender: string;
  checkInTimeRange: {
    startTime: string;
    endTime: string;
  };
  checkOutTimeRange: {
    startTime: string;
    endTime: string;
  };
}

export default function FilterModal({ isOpen, onClose, onApplyFilters, currentFilters }: FilterModalProps) {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);

  const departments = [
    'All Departments',
    'HR',
    'Finance', 
    'IT',
    'Marketing',
    'Sales',
    'Operations',
    'Administration'
  ];

  const genderOptions = [
    'All Genders',
    'Male',
    'Female'
  ];

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      dateRange: { startDate: '', endDate: '' },
      department: 'All Departments',
      gender: 'All Genders',
      checkInTimeRange: { startTime: '', endTime: '' },
      checkOutTimeRange: { startTime: '', endTime: '' }
    };
    setFilters(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="bg-white rounded shadow-lg border w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
        style={{ 
          backgroundColor: "#ffffff",
          borderColor: "#0072a7",
          fontFamily: "'Roboto Slab', serif"
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b" style={{ borderColor: "#0072a7" }}>
          <h2 
            className="text-sm font-semibold" 
            style={{ 
              color: "#005b8a",
              fontFamily: "'Roboto Slab', serif",
              fontWeight: "600",
              letterSpacing: "-0.025em"
            }}
          >
            Filter Reports
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 space-y-4">
          {/* Date Range */}
          <div className="space-y-2">
            <label 
              className="flex items-center gap-2 text-xs font-medium" 
              style={{ 
                color: "#0072a7",
                fontFamily: "'Roboto Slab', serif",
                fontWeight: "500"
              }}
            >
              <Calendar size={14} />
              Date Range
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label 
                  className="block text-xs font-medium mb-1" 
                  style={{ 
                    color: "#0072a7",
                    fontFamily: "'Roboto Slab', serif",
                    fontWeight: "500"
                  }}
                >
                  Start Date
                </label>
                <input
                  type="date"
                  value={filters.dateRange.startDate}
                  onChange={(e) => setFilters({
                    ...filters,
                    dateRange: { ...filters.dateRange, startDate: e.target.value }
                  })}
                  className="w-full px-2 py-1.5 rounded border text-xs"
                  style={{
                    border: "1px solid #d1d5db",
                    backgroundColor: "#ffffff",
                    color: "#374151",
                    fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif"
                  }}
                  onFocus={(e) => {
                    e.target.style.outline = "none";
                    e.target.style.borderColor = "#0072a7";
                    e.target.style.boxShadow = "0 0 0 2px rgba(0, 114, 167, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <label 
                  className="block text-xs font-medium mb-1" 
                  style={{ 
                    color: "#0072a7",
                    fontFamily: "'Roboto Slab', serif",
                    fontWeight: "500"
                  }}
                >
                  End Date
                </label>
                <input
                  type="date"
                  value={filters.dateRange.endDate}
                  onChange={(e) => setFilters({
                    ...filters,
                    dateRange: { ...filters.dateRange, endDate: e.target.value }
                  })}
                  className="w-full px-2 py-1.5 rounded border text-xs"
                  style={{
                    border: "1px solid #d1d5db",
                    backgroundColor: "#ffffff",
                    color: "#374151"
                  }}
                  onFocus={(e) => {
                    e.target.style.outline = "none";
                    e.target.style.borderColor = "#0072a7";
                    e.target.style.boxShadow = "0 0 0 2px rgba(0, 114, 167, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <label 
                  className="block text-xs font-medium mb-1" 
                  style={{ 
                    color: "#0072a7",
                    fontFamily: "'Roboto Slab', serif",
                    fontWeight: "500"
                  }}
                >
                  Department
                </label>
                <select
                  value={filters.department}
                  onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                  className="w-full px-2 py-1.5 rounded border text-xs"
                  style={{
                    border: "1px solid #d1d5db",
                    backgroundColor: "#ffffff",
                    color: "#374151"
                  }}
                  onFocus={(e) => {
                    e.target.style.outline = "none";
                    e.target.style.borderColor = "#0072a7";
                    e.target.style.boxShadow = "0 0 0 2px rgba(0, 114, 167, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Gender and Time Ranges */}
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-2">
              <label 
                className="flex items-center gap-2 text-xs font-medium" 
                style={{ 
                  color: "#0072a7",
                  fontFamily: "'Roboto Slab', serif",
                  fontWeight: "500"
                }}
              >
                <Users size={14} />
                Gender
              </label>
              <select
                value={filters.gender}
                onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                className="w-full px-2 py-1.5 rounded border text-xs"
                style={{
                  border: "1px solid #d1d5db",
                  backgroundColor: "#ffffff",
                  color: "#374151"
                }}
                onFocus={(e) => {
                  e.target.style.outline = "none";
                  e.target.style.borderColor = "#0072a7";
                  e.target.style.boxShadow = "0 0 0 2px rgba(0, 114, 167, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.boxShadow = "none";
                }}
              >
                {genderOptions.map(gender => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label 
                className="flex items-center gap-2 text-xs font-medium" 
                style={{ 
                  color: "#0072a7",
                  fontFamily: "'Roboto Slab', serif",
                  fontWeight: "500"
                }}
              >
                <Clock size={14} />
                Check-in Start
              </label>
              <input
                type="time"
                value={filters.checkInTimeRange.startTime}
                onChange={(e) => setFilters({
                  ...filters,
                  checkInTimeRange: { ...filters.checkInTimeRange, startTime: e.target.value }
                })}
                className="w-full px-2 py-1.5 rounded border text-xs"
                style={{
                  border: "1px solid #d1d5db",
                  backgroundColor: "#ffffff",
                  color: "#374151"
                }}
                onFocus={(e) => {
                  e.target.style.outline = "none";
                  e.target.style.borderColor = "#0072a7";
                  e.target.style.boxShadow = "0 0 0 2px rgba(0, 114, 167, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div className="space-y-2">
              <label 
                className="flex items-center gap-2 text-xs font-medium" 
                style={{ 
                  color: "#0072a7",
                  fontFamily: "'Roboto Slab', serif",
                  fontWeight: "500"
                }}
              >
                <Clock size={14} />
                Check-in End
              </label>
              <input
                type="time"
                value={filters.checkInTimeRange.endTime}
                onChange={(e) => setFilters({
                  ...filters,
                  checkInTimeRange: { ...filters.checkInTimeRange, endTime: e.target.value }
                })}
                className="w-full px-2 py-1.5 rounded border text-xs"
                style={{
                  border: "1px solid #d1d5db",
                  backgroundColor: "#ffffff",
                  color: "#374151"
                }}
                onFocus={(e) => {
                  e.target.style.outline = "none";
                  e.target.style.borderColor = "#0072a7";
                  e.target.style.boxShadow = "0 0 0 2px rgba(0, 114, 167, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Check-out Time Range */}
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-2">
              <label 
                className="flex items-center gap-2 text-xs font-medium" 
                style={{ 
                  color: "#0072a7",
                  fontFamily: "'Roboto Slab', serif",
                  fontWeight: "500"
                }}
              >
                <Clock size={14} />
                Check-out Start
              </label>
              <input
                type="time"
                value={filters.checkOutTimeRange.startTime}
                onChange={(e) => setFilters({
                  ...filters,
                  checkOutTimeRange: { ...filters.checkOutTimeRange, startTime: e.target.value }
                })}
                className="w-full px-2 py-1.5 rounded border text-xs"
                style={{
                  border: "1px solid #d1d5db",
                  backgroundColor: "#ffffff",
                  color: "#374151"
                }}
                onFocus={(e) => {
                  e.target.style.outline = "none";
                  e.target.style.borderColor = "#0072a7";
                  e.target.style.boxShadow = "0 0 0 2px rgba(0, 114, 167, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div className="space-y-2">
              <label 
                className="flex items-center gap-2 text-xs font-medium" 
                style={{ 
                  color: "#0072a7",
                  fontFamily: "'Roboto Slab', serif",
                  fontWeight: "500"
                }}
              >
                <Clock size={14} />
                Check-out End
              </label>
              <input
                type="time"
                value={filters.checkOutTimeRange.endTime}
                onChange={(e) => setFilters({
                  ...filters,
                  checkOutTimeRange: { ...filters.checkOutTimeRange, endTime: e.target.value }
                })}
                className="w-full px-2 py-1.5 rounded border text-xs"
                style={{
                  border: "1px solid #d1d5db",
                  backgroundColor: "#ffffff",
                  color: "#374151"
                }}
                onFocus={(e) => {
                  e.target.style.outline = "none";
                  e.target.style.borderColor = "#0072a7";
                  e.target.style.boxShadow = "0 0 0 2px rgba(0, 114, 167, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-transparent">Spacer</label>
              <div className="text-xs text-gray-500 px-2 py-1.5 italic">
                All filters optional
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-3 border-t" style={{ borderColor: "#0072a7", backgroundColor: "#f8fafc" }}>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-medium rounded border"
            style={{
              border: "1px solid #d1d5db",
              backgroundColor: "#ffffff",
              color: "#374151",
              fontFamily: "'Roboto Slab', serif",
              fontWeight: "500"
            }}
          >
            Reset All
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium rounded border"
              style={{
                border: "1px solid #d1d5db",
                backgroundColor: "#ffffff",
                color: "#374151",
                fontFamily: "'Roboto Slab', serif",
                fontWeight: "500"
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-3 py-1.5 text-xs font-medium text-white rounded"
              style={{
                backgroundColor: "#0072a7",
                border: "1px solid #0072a7",
                fontFamily: "'Roboto Slab', serif",
                fontWeight: "500"
              }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}