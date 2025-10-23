const players = {
  goalkeepers: [
    {
      id: 1,
      firstName: "Mustapha",
      lastName: "Oduor",
      number: "1",
      position: "Goalkeeper",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/3277f280-61b2-11f0-a8b2-85fd89a3d94c.webp",
    },
    {
      id: 2,
      firstName: "Erick",
      lastName: "Ongiri",
      number: "31",
      position: "Goalkeeper",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/49593e00-79cc-11f0-91cc-258e0b00204a.webp",
    },
    {
      id: 3,
      firstName: "Davis",
      lastName: "Omiko Nyakeba",
      number: "1",
      position: "Goalkeeper",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/49593e00-79cc-11f0-91cc-258e0b00204a.webp",
    },
    {
      id: 4,
      firstName: "Wilson",
      lastName: "Mwangi Kamau",
      number: "1",
      position: "Goalkeeper",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/49593e00-79cc-11f0-91cc-258e0b00204a.webp",
    },
  ],
  defenders: [
    {
      id: 5,
      firstName: "Dennis",
      lastName: "Munyonyi",
      number: "33",
      position: "Defender",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/4a09f060-79cc-11f0-a583-ddd4efcbf315.webp",
    },
    {
      id: 6,
      firstName: "Jackson",
      lastName: "Imbiakha",
      number: "2",
      position: "Defender",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/f37c3c20-79cc-11f0-8057-b7c705542f60.webp",
    },
    {
      id: 7,
      firstName: "Robert",
      lastName: "Mudenyu",
      number: "15",
      position: "Defender",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/496aa320-79cc-11f0-ac3b-cd7fcf33e697.webp",
    },
    {
      id: 8,
      firstName: "Edwin",
      lastName: "Njumba",
      number: "14",
      position: "Defender",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/49637730-79cc-11f0-9f15-730788df838f.webp",
    },
    {
      id: 9,
      firstName: "Francis",
      lastName: "Gethio",
      number: "16",
      position: "Defender",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/49637730-79cc-11f0-9f15-730788df838f.webp",
    },
    {
      id: 10,
      firstName: "Mark",
      lastName: "Mwaniki",
      number: "0",
      position: "Defender",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/49637730-79cc-11f0-9f15-730788df838f.webp",
    },
    {
      id: 11,
      firstName: "Telvin",
      lastName: "Maina",
      number: "0",
      position: "Defender",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/49637730-79cc-11f0-9f15-730788df838f.webp",
    },
  ],
  midfielders: [
    {
      id: 12,
      firstName: "Levis",
      lastName: "Wanjala",
      number: "0",
      position: "Midfielder",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/217d7170-777a-11f0-b5d1-dfedd4fe2a84.webp",
    },
    {
      id: 13,
      firstName: "Lucas",
      lastName: "Maina",
      number: "24",
      position: "Midfielder",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/c9861940-72d3-11f0-adee-e96dc386ea24.webp",
    },
    {
      id: 14,
      firstName: "Michael",
      lastName: "Owen Pala",
      number: "23",
      position: "Midfielder",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/49609100-79cc-11f0-b2b1-0bdf786c60ec.webp",
    },
    {
      id: 15,
      firstName: "Price",
      lastName: "Musebe",
      number: "0",
      position: "Midfielder",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/49609100-79cc-11f0-b2b1-0bdf786c60ec.webp",
    },
    {
      id: 16,
      firstName: "Joseph",
      lastName: "Omulama",
      number: "0",
      position: "Midfielder",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/49609100-79cc-11f0-b2b1-0bdf786c60ec.webp",
    },
    {
      id: 17,
      firstName: "Paul",
      lastName: "Njuguna Ngugi",
      number: "0",
      position: "Midfielder",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/49609100-79cc-11f0-b2b1-0bdf786c60ec.webp",
    },
    {
      id: 18,
      firstName: "Thadeas",
      lastName: "Pkemoi Pkiach",
      number: "0",
      position: "Midfielder",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/49609100-79cc-11f0-b2b1-0bdf786c60ec.webp",
    },
  ],
  forwards: [
    {
      id: 19,
      firstName: "Elly",
      lastName: "Saenyi",
      number: "11",
      position: "Forward",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/4974dc50-79cc-11f0-8057-b7c705542f60.webp",
    },
    {
      id: 20,
      firstName: "Francis",
      lastName: "Isiololo Memusi",
      number: "13",
      position: "Forward",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/95dac8d0-7f75-11f0-bc2b-f952e35ff208.webp",
    },
    {
      id: 21,
      firstName: "Joe Joseph",
      lastName: "Irungu Waithira",
      number: "41",
      position: "Forward",
      captain: true,
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/4964d6c0-79cc-11f0-a412-41f009c8c3b6.webp",
    },
    {
      id: 22,
      firstName: "John",
      lastName: "Kiplagat",
      number: "0",
      position: "Forward",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/4964d6c0-79cc-11f0-a412-41f009c8c3b6.webp",
    },
    {
      id: 23,
      firstName: "Victor",
      lastName: "Haki Akwanyi",
      number: "99",
      position: "Forward",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/4964d6c0-79cc-11f0-a412-41f009c8c3b6.webp",
    },
    {
      id: 24,
      firstName: "Tony",
      lastName: "Musa Shiroya",
      number: "26",
      position: "Forward",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/4964d6c0-79cc-11f0-a412-41f009c8c3b6.webp",
    },
    {
      id: 25,
      firstName: "Joseph",
      lastName: "Mumo",
      number: "0",
      position: "Forward",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/4964d6c0-79cc-11f0-a412-41f009c8c3b6.webp",
    },
    {
      id: 26,
      firstName: "Michael",
      lastName: "Macharia",
      number: "66",
      position: "Forward",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/4964d6c0-79cc-11f0-a412-41f009c8c3b6.webp",
    },
    {
      id: 27,
      firstName: "Paul",
      lastName: "Osama",
      number: "0",
      position: "Forward",
      image:
        "https://images.gc.evertonfcservices.co.uk/fit-in/1200x675/4964d6c0-79cc-11f0-a412-41f009c8c3b6.webp",
    },
  ],
};

export default players;
