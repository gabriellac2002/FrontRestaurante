type OpinionsProps = {
    opinion: string;
    user: string;
}

export default function Opinions({ opinion, user }: OpinionsProps) {
    return (
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg md:w-1/3">
        <p>{opinion}</p>
        <span className="block mt-4 font-bold">{user}</span>
      </div>
    );
}