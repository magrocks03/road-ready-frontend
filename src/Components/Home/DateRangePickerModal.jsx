import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, addDays, startOfToday } from 'date-fns';

// Custom Hook to detect screen size for responsive calendar
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);
  return matches;
};

const DateRangePickerModal = ({ isOpen, onClose, onContinue }) => {
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [startTime, setStartTime] = useState(12);
  const [endTime, setEndTime] = useState(12);
  const today = startOfToday();
  const isDesktop = useMediaQuery('(min-width: 768px)');

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

  const disabledDays = [{ before: today }];
  if (range?.from) {
    const maxEndDate = addDays(range.from, 30);
    disabledDays.push({ after: maxEndDate });
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-fit rounded-lg bg-card p-6 shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="text-text-secondary text-sm md:text-base">
              <span className={range?.from ? 'text-text-primary font-semibold' : ''}>{range?.from ? format(range.from, "d MMM ''yy") : 'Select Start Date'}</span>
              <span> - </span>
              <span className={range?.to ? 'text-text-primary font-semibold' : ''}>{range?.to ? format(range.to, "d MMM ''yy") : 'Select End Date'}</span>
            </div>
            <button onClick={handleReset} className="text-sm text-text-secondary hover:text-primary">RESET</button>
          </div>

          <div className="flex justify-center">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={handleDaySelect}
              numberOfMonths={isDesktop ? 2 : 1}
              pagedNavigation
              disabled={disabledDays}
              classNames={{
                caption_label: 'text-lg font-bold text-text-primary',
                nav_button: 'h-8 w-8 flex items-center justify-center rounded-full hover:bg-border',
                head_cell: 'text-sm text-text-secondary',
                day: 'w-10 h-10 rounded-full hover:bg-border',
                day_selected: 'bg-primary text-white hover:bg-primary-hover',
                day_range_start: 'rounded-r-none bg-primary text-white',
                day_range_end: 'rounded-l-none bg-primary text-white',
                day_range_middle: 'rounded-none bg-primary/20 dark:bg-primary/30 text-text-primary',
                day_disabled: 'text-border cursor-not-allowed',
                day_today: 'font-bold text-primary',
              }}
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
