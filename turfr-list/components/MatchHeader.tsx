// logo
// Title
// price
// max players

import Image from "next/image";

export default function MatchHeader({ match } : { match : any} ) {
    return (
        <div className="px-4 pt-6 pb-3 text-center">

            <header className="mb-4">
                <Image
                    src="/turfr-logo.svg"
                    alt="Turfr logo"
                    width={80}
                    height={30}
                    className="mx-auto"
                />
            </header>

                <h1 className="text-xl font-semibold mb-2">
                    {match.title}
                </h1>

                <div className="text-sm text-zinc-400 space-y-1">
                    {/*<p>Total Cost: ₹{match.total_cost}</p>*/}
                    <p>Venue: XYZ</p>
                    <p>Per Head: ₹{match.price_per_player}</p>
                    {/*<p>Max Players: {match.max_players}</p>*/}
                    {/*<p>UPI ID: {match.upi_id}</p>*/}

                    {/* TODO: Create a clickable card that reveals more information */}
                </div>
        </div>
    );
}