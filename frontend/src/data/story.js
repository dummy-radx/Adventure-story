export const storyData = {
  cover: {
    title: "Our Great Adventure",
    subtitle: "A story of Ishan and Sreeparna",
    image: "/images/book_cover_scene.png",
  },
  chapters: [
    {
      id: 1,
      title: "The Enchanted Forest",
      image: "/images/ch1_forest_scene.png",
      text: "Ishan and Sreeparna found themselves at the edge of the ancient Enchanted Forest. The air was thick with the scent of pine and magic, while glowing wisps danced between the massive trees. They knew that somewhere far across the realms lay the Ultimate Treasure, a mythical prize meant only for true adventurers. But first, they had to navigate the mysterious woods. Two paths lay before them.",
      options: [
        { text: "Follow the Glowing Wisps", nextOutcome: "1a" },
        { text: "Walk the Hidden Stream", nextOutcome: "1b" }
      ]
    },
    {
      id: 2,
      title: "The Whispering Mountains",
      image: "/images/ch2_mountain_scene.png",
      text: "Emerging from the forest, they were greeted by the towering Whispering Mountains. The wind hummed melodies as it brushed through the snow-capped peaks. It was freezing, but they huddled close together to share their warmth. To cross the range, they had to choose how to ascend the treacherous terrain.",
      options: [
        { text: "Climb the Sky Peak", nextOutcome: "2a" },
        { text: "Navigate the Ice Caves", nextOutcome: "2b" }
      ]
    },
    {
      id: 3,
      title: "The Crystal Sea",
      image: "/images/ch3_sea_scene.png",
      text: "After descending the mountain, they arrived at the shores of the Crystal Sea. The water was so clear it sparkled like liquid diamonds under the sun. Out in the distance, a glowing beacon hinted at their next destination, but getting across the magical waters required a decision.",
      options: [
        { text: "Cross the Coral Bridge", nextOutcome: "3a" },
        { text: "Ride a Giant Sea Turtle", nextOutcome: "3b" }
      ]
    },
    {
      id: 4,
      title: "The Stardust Valley",
      image: "/images/ch4_valley_scene.png",
      text: "On the other side of the sea lay the breathtaking Stardust Valley, where the ground was covered in softly glowing flora, and the night sky seemed to touch the earth. Shooting stars frequently landed here, leaving trails of pixie dust. They needed a place to rest and gather clues for the treasure.",
      options: [
        { text: "Explore the Meteor Crater", nextOutcome: "4a" },
        { text: "Rest by the Aurora Lake", nextOutcome: "4b" }
      ]
    },
    {
      id: 5,
      title: "The Forgotten Temple",
      image: "/images/ch5_temple_scene.png",
      text: "Guided by the stardust, they finally stumbled upon the Forgotten Temple, hidden away in a dense thicket of magical vines. The ancient stones pulsed with an otherworldly energy, protecting the secrets within. Two massive doors stood before them in the grand hall.",
      options: [
        { text: "Open the Golden Door", nextOutcome: "5a" },
        { text: "Open the Silver Door", nextOutcome: "5b" }
      ]
    },
    {
      id: 6,
      title: "The Treasure Chamber",
      image: "/images/ch6_chamber_scene.png",
      text: "They stepped into the massive Treasure Chamber. The walls were lined with glittering jewels and ancient artifacts, but at the center of the room sat two pedestals, each holding a magnificent locked chest. This was it—the culmination of their entire journey!",
      options: [
        { text: "Unlock the Diamond Chest", nextOutcome: "6a" },
        { text: "Unlock the Ruby Chest", nextOutcome: "6b" }
      ]
    }
  ],
  outcomes: {
    "1a": {
      text: "The glowing wisps playfully guided them through a secret grove filled with singing flowers! They learned a cheerful tune together before the forest cleared, revealing majestic mountains in the distance.",
      nextChapter: 2,
      image: "/images/out_1a_fairy_ring.png"
    },
    "1b": {
      text: "They followed the crystal-clear stream and met a friendly water sprite who gifted them a magical compass. With their new treasure, they easily found their way out of the forest.",
      nextChapter: 2,
      image: "/images/out_1b_stream.png"
    },
    "2a": {
      text: "They braved the steep Sky Peak, cheering each other on. At the top, they were rewarded with a breathtaking view of the entire world, and a gentle giant eagle offered to fly them down.",
      nextChapter: 3,
      image: "/images/out_2a_peak.png"
    },
    "2b": {
      text: "Inside the glittering ice caves, they discovered ancient frosted crystals that hummed a peaceful lullaby. They shared a warm hug to beat the chill as they found the exit.",
      nextChapter: 3,
      image: "/images/out_2b_caves.png"
    },
    "3a": {
      text: "The Coral Bridge was a kaleidoscope of colors that chimed under their feet. They spotted playful rainbow fish jumping alongside them as they safely crossed the sea.",
      nextChapter: 4,
      image: "/images/out_3a_bridge.png"
    },
    "3b": {
      text: "They hopped onto the back of a wise, ancient sea turtle who told them tales of the sea's history. It was a smooth and magical ride across the glittering waves.",
      nextChapter: 4,
      image: "/images/out_3b_turtle.png"
    },
    "4a": {
      text: "At the Meteor Crater, they found chunks of fallen stars. Ishan pocketed a tiny glowing star fragment and gave it to Sreeparna as a token of their cosmic adventure.",
      nextChapter: 5,
      image: "/images/out_4a_crater.png"
    },
    "4b": {
      text: "They sat by the Aurora Lake, watching the sky's reflection shimmering in the water. They skipped glowing stones across the surface, enjoying a perfectly peaceful moment.",
      nextChapter: 5,
      image: "/images/out_4b_lake.png"
    },
    "5a": {
      text: "The Golden Door swung open to reveal a hall of mirrors that showed them beautiful reflections of their future together. Armed with confidence, they proceeded deeper.",
      nextChapter: 6,
      image: "/images/out_5a_gold.png"
    },
    "5b": {
      text: "The Silver Door led to an ancient library of floating books. They read a magical scroll that revealed the final password to the treasure chamber.",
      nextChapter: 6,
      image: "/images/out_5b_silver.png"
    },
    "6a": {
      text: "The Diamond Chest burst open in a shower of glittering starlight! Inside, they found the ultimate prize: a woven band of eternal love and adventure.",
      nextChapter: "end",
      image: "/images/out_6a_diamond.png"
    },
    "6b": {
      text: "The Ruby Chest unlocked with a warm, rosy glow. They discovered a pair of enchanted crowns, crowning them the King and Queen of the Magical Realms!",
      nextChapter: "end",
      image: "/images/out_6b_ruby.png"
    }
  },
  end: {
    title: "The Ultimate Treasure",
    text: "They realized the true treasure wasn't just the magic they had found, but the fact that they faced every choice and challenge together. The adventure of Ishan and Sreeparna was only just beginning! I love you, Cutu! ❤️",
    image: "/images/end_scene.png"
  }
};
