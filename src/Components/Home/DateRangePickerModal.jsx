import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, addDays } from 'date-fns';

// Custom styles for react-day-picker to match our theme
const css = `
  .rdp {
    --rdp-cell-size: 40px;
    --rdp-accent-color: var(--color-primary);
    --rdp-background-color: var(--color-primary-hover);
    --rdp-accent-color-dark: var(--color-primary);
    --rdp-background-color-dark: var(--color-primary-hover);
    --rdp-outline: 2px solid var(--color-primary);
    --rdp-outline-selected: 3px solid var(--color-primary);
    margin: 1em 0;
  }
  .rdp-caption_label { font-weight: 600; color: var(--color-text-primary); }
  .rdp-nav_button { color: var(--color-text-secondary); }
  .rdp-head_cell { color: var(--color-text-secondary); }
  .rdp-day { color: var(--color-text-primary); }
  .rdp-day_selected { background-color: var(--color-primary) !important; color: white !important; }
  .rdp-day_range_start, .rdp-day_range_end { background-color: var(--color-primary) !important; color: white !important; }
  .rdp-day_range_middle { background-color: var(--color-primary-hover) !important; color: white !important; opacity: 0.8; }
  .rdp-day_disabled { color: var(--color-border); }
`;

const DateRangePickerModal = ({ isOpen, onClose, onContinue }) => {
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [startTime, setStartTime] = useState(12);
  const [endTime, setEndTime] = useState(12);

  const isContinueDisabled = !range || !range.from || !range.to;

  const formatTime = (hour) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}:00 ${period}`;
  };

  const handleContinue = () => {
    if (isContinueDisabled) return;
    onContinue({ from: range.from, to: range.to, startTime, endTime });
    onClose();
  };

  const handleReset = () => {
    setRange({ from: undefined, to: undefined });
    setStartTime(12);
    setEndTime(12);
  };

  const handleDaySelect = (selectedRange) => {
    if (selectedRange?.from && selectedRange?.to) {
      const maxEndDate = addDays(selectedRange.from, 30);
      if (selectedRange.to > maxEndDate) {
        setRange({ from: selectedRange.to, to: undefined });
        return;
      }
    }
    setRange(selectedRange);
  };

  const modifiers = {};
  if (range?.from) {
    const maxEndDate = addDays(range.from, 30);
    modifiers.disabled = [{ after: maxEndDate }];
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* --- CHANGES ARE ON THIS LINE --- */}
        <Dialog.Panel className="w-full max-w-fit rounded-lg bg-card p-6 shadow-xl max-h-[90vh] overflow-y-auto">
          <style>{css}</style>
          <div className="flex justify-between items-center mb-4">
            <div className="text-text-secondary text-sm md:text-base">
              <span className={range?.from ? 'text-text-primary font-semibold' : ''}>
                {range?.from ? format(range.from, "d MMM ''yy") : 'Select Start Date'}
              </span>
              <span> - </span>
              <span className={range?.to ? 'text-text-primary font-semibold' : ''}>
                {range?.to ? format(range.to, "d MMM ''yy") : 'Select End Date'}
              </span>
            </div>
            <button onClick={handleReset} className="text-sm text-text-secondary hover:text-primary">RESET</button>
          </div>

          <div className="flex flex-col md:flex-row justify-center">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={handleDaySelect}
              numberOfMonths={2}
              pagedNavigation
              disabled={{ before: new Date() }}
              modifiers={modifiers}
            />
          </div>

          <hr className="border-border my-4"/>

          <div className="space-y-4">
            <h3 className="text-text-primary font-semibold">Select the start time & end time</h3>
            <div>
              <div className="flex justify-between text-sm text-text-secondary mb-1">
                <span>Start Time</span>
                <span className="font-medium text-text-primary">{formatTime(startTime)}</span>
              </div>
              <input type="range" min="0" max="23" value={startTime} onChange={(e) => setStartTime(parseInt(e.target.value))} className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary" />
            </div>
            <div>
              <div className="flex justify-between text-sm text-text-secondary mb-1">
                <span>End Time</span>
                <span className="font-medium text-text-primary">{formatTime(endTime)}</span>
              </div>
              <input type="range" min="0" max="23" value={endTime} onChange={(e) => setEndTime(parseInt(e.target.value))} className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary" />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleContinue}
              disabled={isContinueDisabled}
              className="px-6 py-2 font-medium text-white bg-primary rounded-md transition duration-300 disabled:bg-slate-gray disabled:cursor-not-allowed hover:bg-primary-hover"
            >
              Continue
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default DateRangePickerModal;