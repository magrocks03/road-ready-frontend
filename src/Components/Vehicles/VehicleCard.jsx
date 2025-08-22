import { Link } from 'react-router-dom';

const placeholderImage = 'https://placehold.co/600x400/e2e8f0/e2e8f0?text=';

const VehicleCard = ({ vehicle }) => {
  return (
    <Link to={`/vehicles/${vehicle.id}`} className="block">
      <div className="bg-card rounded-lg shadow-md overflow-hidden group transition duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <div className="relative h-48">
          <img
            src={vehicle.imageUrl || placeholderImage}
            alt={`${vehicle.brandName} ${vehicle.name}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
          />
          <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 m-2 rounded-full">
            {vehicle.isAvailable ? 'Available' : 'Unavailable'}
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-text-secondary">{vehicle.brandName}</p>
              <h3 className="text-lg font-bold text-text-primary truncate">
                {vehicle.name} {vehicle.model}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-primary">
                ${vehicle.pricePerDay}
              </p>
              <p className="text-xs text-text-secondary">/ day</p>
            </div>
          </div>

          <hr className="my-3 border-border" />

          <div className="flex justify-between items-center text-sm text-text-secondary">
            {/* --- THIS IS THE FIXED SVG ICON --- */}
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{vehicle.transmission}</span>
            </div>
            <div className="flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z"></path></svg>
              <span>{vehicle.fuelType}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              <span>{vehicle.seatingCapacity} Seats</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;