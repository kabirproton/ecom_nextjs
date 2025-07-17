const PromoBanners = () => {
  const promos = [
    {
      id: 1,
      title: "GET EXTRA 10% OFF",
      subtitle: "on purchase of ₹1999",
      code: "CODE: EOSS10",
      bgColor: "bg-red-700",
    },
    {
      id: 2,
      title: "GET FLAT ₹500 OFF",
      subtitle: "on purchase of ₹2999",
      code: "CODE: EOSS500",
      bgColor: "bg-red-600",
    },
    {
      id: 3,
      title: "GET EXTRA 15% OFF",
      subtitle: "on purchase of ₹4999",
      code: "CODE: EOSS15",
      bgColor: "bg-red-700",
    },
    {
      id: 4,
      title: "GET FLAT ₹1500 OFF",
      subtitle: "on purchase of ₹9999",
      code: "CODE: EOSS1500",
      bgColor: "bg-red-600",
    },
  ]

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {promos.map((promo) => (
            <div key={promo.id} className={`${promo.bgColor} text-white p-6 text-center rounded-lg`}>
              <h3 className="text-xl font-bold mb-2">{promo.title}</h3>
              <p className="text-sm mb-4">{promo.subtitle}</p>
              <div className="border border-white border-dashed p-2 mb-4">
                <p className="text-sm font-mono">{promo.code}</p>
              </div>
              <button className="border border-white text-white px-6 py-2 text-sm hover:bg-white hover:text-red-600 transition-colors">
                SHOP NOW
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PromoBanners
