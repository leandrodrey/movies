import Link from 'next/link';

const categories = [
    { name: 'Acción', href: '/MovieCategory/Action' },
    { name: 'Comedia', href: '/MovieCategory/Comedy' },
    { name: 'Drama', href: '/MovieCategory/Drama' },
    { name: 'Fantasía', href: '/MovieCategory/Fantasy' },
];

const CategoriesButtons = () => {
    return (
        <div className="flex gap-4 p-4 justify-between">
            {categories.map((category) => (
                <Link key={category.name} href={category.href} legacyBehavior>
                    <a className="
                        bg-gray-800
                        text-white
                        py-4
                        px-6
                        rounded-md
                        shadow-md
                        hover:bg-gray-700
                        transition
                        duration-300
                        flex items-center justify-center
                        w-full
                        md:w-48"
                    >
                        {category.name}
                    </a>
                </Link>
            ))}
        </div>
    );
}

export default CategoriesButtons;
