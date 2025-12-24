import { Track } from '@/types';

/**
 * Music library data
 * In a real application, this would come from an API
 * Follows the Open-Closed Principle - easy to extend with new tracks
 */

export const MUSIC_LIBRARY: Track[] = [
  {
    id: '1',
    name: 'Lutt Putt Gaya',
    artist: 'Pritam, Arijit Singh, IP Singh, Swanand Kirkire',
    albumArt: 'https://c.saavncdn.com/265/Lutt-Putt-Gaya-From-Dunki-Hindi-2023-20231211171015-500x500.jpg',
    audioUrl: '/music/lutt.mp3',
  },
  {
    id: '2',
    name: 'Nikle The Kabhi Hum Ghar Se',
    artist: 'Pritam, Sonu Nigam, Javed Akhtar',
    albumArt: 'https://c.saavncdn.com/439/Nikle-The-Kabhi-Hum-Ghar-Se-From-Dunki-Hindi-2023-20231211171011-500x500.jpg',
    audioUrl: '/music/nikle.mp3',
  },
  {
    id: '3',
    name: 'Banda',
    artist: 'Pritam, Diljit Dosanjh, Kumaar',
    albumArt: 'https://c.saavncdn.com/621/Banda-From-Dunki-Hindi-2023-20231218171036-500x500.jpg',
    audioUrl: '/music/banda.mp3',
  },
  {
    id: '4',
    name: 'O Maahi',
    artist: 'Pritam, Arijit Singh, Irshad Kamil',
    albumArt: 'https://www.cinejosh.com/newsimg/newsmainimg/dunki-drop-5-o-maahi-song-promo-released_b_1112230923.jpg',
    audioUrl: '/music/o.mp3',
  },
  {
    id: '5',
    name: 'Main Tera Rasta Dekhunga',
    artist: 'Pritam, Vishal Mishra, Shreya Ghoshal',
    albumArt: 'https://i.ytimg.com/vi/3ZqkYzSnv3c/maxresdefault.jpg',
    audioUrl: '/music/main.mp3',
  },
  {
    id: '6',
    name: 'Waheguru',
    artist: 'Shekhar Ravjiani, Ajay Bijli',
    albumArt: 'https://i.ytimg.com/vi/7p4EW7RIcl4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCRlyAFnujhCB0qIYzrHIB4uI7Row',
    audioUrl: '/music/waheguru.mp3',
  },
  {
    id: '7',
    name: 'Mitti',
    artist: 'Suresh Wadkar, Shekhar Ravjiani',
    albumArt: 'https://c.saavncdn.com/153/Fighter-Hindi-2024-20240123121002-500x500.jpg',
    audioUrl: '/music/mitti.mp3',
  },
  {
    id: '8',
    name: 'Vande Mataram',
    artist: 'Vishal Dadlani, Shekhar Ravjiani',
    albumArt: 'https://c.saavncdn.com/153/Fighter-Hindi-2024-20240123121002-500x500.jpg',
    audioUrl: '/music/vande.mp3',
  },
  {
    id: '9',
    name: 'Dil Chah Raha Hai',
    artist: 'Vishal Mishra & Shilpa Rao',
    albumArt: 'https://i.ytimg.com/vi/SjjRtXbTAMw/hqdefault.jpg',
    audioUrl: '/music/dil.mp3',
  },
  {
    id: '10',
    name: 'Saajan Ve',
    artist: 'Darshan Raval',
    albumArt: 'https://i.ytimg.com/vi/KeqdY-MDLIg/sddefault.jpg',
    audioUrl: '/music/saajan.mp3',
  },
  {
    id: '11',
    name: 'Chandni Raat',
    artist: 'Ali Sethi',
    albumArt: 'https://i.ytimg.com/vi/5NosYGbaOio/maxresdefault.jpg',
    audioUrl: '/music/chandni.mp3',
  },
  {
    id: '12',
    name: 'Jhumka',
    artist: 'Bijay Anand Sahu',
    albumArt: 'https://c.saavncdn.com/337/Jhumka-Oriya-2023-20231209195005-500x500.jpg',
    audioUrl: '/music/jhumka.mp3',
  },
  {
    id: '13',
    name: 'Jiya Tui Chara',
    artist: 'Arijit Singh',
    albumArt: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhck22fc9m-kJvz7HqCytrGu_twDcyU2r9A8ZoTBfdehKEq7dDXbNdLkc29EliONxNGA_9iyYSoNqLZwx-d3qNu7VY1C0IBlqSx7g1gaFrKIJmc6pcc9_gl9ReSvlbc2VjsSImzjjv4Qp_L1zwuO0it2Di7isej0dmlUIdGJTAHOC1mP8wudwyDWDioImk/w1200-h630-p-k-no-nu/Jiya-Tui-Chara-From-Biye-Bibhrat-Bengali-2023.jpg',
    audioUrl: '/music/jiya.mp3',
  },
];
