const fortunes = [
  {
    text: "Your dreams will soon come true.",
    emojis: "✨💭➡️🌈✅",
  },
  {
    text: "Your good mood is contagious.",
    emojis: "🫵☀️🙂🟰🦠",
  },
  {
    text: "Stay calm. You are on top.",
    emojis: "😌🧘‍♂️✨⬆️👑",
  },
  {
    text: "Be yourself and you will feel at home everywhere.",
    emojis: "🐝✨🫂🏡🌎",
  },
  {
    text: "Your prospects are the best, accept it.",
    emojis: "🔭🔮🌞🫵🤝",
  },
  {
    text: "The middle of the night is also the beginning of a new day. ",
    emojis: "🌚🌌🔄🌅🌝",
  },
  {
    text: "Power may create an imposing image but no larger self.",
    emojis: "💪🏰💸🦍🕴🕳",
  },
  {
    text: "Your life is going to be enriched by impressions and friendships.",
    emojis: "🫵🔮✨📸🫂",
  },
  {
    text: "You can do it!",
    emojis: "😎🦄🍕🤸‍♂️🎉",
  },
  {
    text: "Obstacles in your way can become building blocks for something beautiful",
    emojis: "🍋🚧💡🏗✨",
  },
]

for (const fortune of fortunes) {
  document.cookie = `${fortune.text}=${fortune.emojis}`
}

const back = document.querySelector('.back')
const front = document.querySelector('.front')
const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
back.textContent = randomFortune.text
front.textContent = randomFortune.emojis
