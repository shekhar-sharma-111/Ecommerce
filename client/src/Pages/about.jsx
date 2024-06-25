import React from 'react';

const AboutPage = () => {
  return (
    <div className=" my-3 py-3 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <h1 className="text-center text-6xl max-md:text-3xl max-lg:text-5xl">About Us</h1>
      <hr className="m-6" />

      <p className="text-lg leading-relaxed">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum facere
        doloremque veritatis odit similique sequi. Odit amet fuga nam quam quasi
        facilis sed doloremque saepe sint perspiciatis explicabo totam vero
        quas provident ipsam, veritatis nostrum velit quos recusandae est
        mollitia esse fugit dolore laudantium. Ex vel explicabo earum unde
        eligendi autem praesentium, doloremque distinctio nesciunt porro tempore
        quis eaque labore voluptatibus ea necessitatibus exercitationem tempora
        molestias. Ad consequuntur veniam sequi ullam tempore vel tenetur soluta
        dolore sunt maxime aliquam corporis est, quo saepe dolorem optio minus
        sint nemo totam dolorum! Reprehenderit delectus expedita a alias nam
        recusandae illo debitis repellat libero, quasi explicabo molestiae saepe,
        dolorem tempore itaque eveniet quam dignissimos blanditiis excepturi
        harum numquam vel nihil? Ipsum
      </p>

      <h2 className="text-2xl font-bold py-4">Our Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="mb-3">
          <div className="bg-white p-3 rounded-lg">
            <img
              className="w-full h-48 object-cover mb-3 rounded"
              src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
            <h5 className="text-xl font-semibold">Men's Clothing</h5>
          </div>
        </div>

        <div className="mb-3">
          <div className="bg-white p-3 rounded-lg">
            <img
              className="w-full h-48 object-cover mb-3 rounded"
              src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
            <h5 className="text-xl font-semibold">Women's Clothing</h5>
          </div>
        </div>

        <div className="mb-3">
          <div className="bg-white p-3 rounded-lg">
            <img
              className="w-full h-48 object-cover mb-3 rounded"
              src="https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
            <h5 className="text-xl font-semibold">Jewelry</h5>
          </div>
        </div>

        <div className="mb-3">
          <div className="bg-white p-3 rounded-lg">
            <img
              className="w-full h-48 object-cover mb-3 rounded"
              src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
            <h5 className="text-xl font-semibold">Electronics</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
