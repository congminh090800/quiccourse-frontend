export const defaultCovers = [
  "https://lh3.googleusercontent.com/IsoNa2rfYjziOtdARnjmBR08J2gb4nhbV6f_sIlz9PY5Ub6bfnRv5RCOYzgJsBUOkBWTKU73mcBA=w287-h98-p",
  "https://lh3.googleusercontent.com/gJKFJqZk6U6NSN6bZRYVHn4VdgFhRthoeewhQahQjy1Qm0WEGTKfuJLMnV9dJp0ypnndkv_N0IM_=w287-h98-p",
  "https://lh3.googleusercontent.com/w-ikCo0P2hTtVJCfEhkyNZKkCZQc5uirT2xb8JJafe916-fNuuGJsoN-TYj1SzW_9nPmSFI-8vo4=w287-h98-p",
  "https://lh3.googleusercontent.com/MIawNdLucf-mcojNOpRe4juHRfjRG7sYbBqvf8RQwtsxCH7uX075DH5QXSJsNxQAHJkzvsOy0yoI=w287-h98-p",
  "https://lh3.googleusercontent.com/Y2MgzmpsyjRF-K1bYxOI7GGiOJE6s79qHuxirOsEecNJWETJbhv1EKTGscvvMRgX1jWOomiya1Hh=w287-h98-p",
  "https://lh3.googleusercontent.com/V8zYSN-6mnXgp9ujZMY0bUE2eD6jxxOBUNhTsT-o5RH5io0nnf7KlMl9HVOBavcmOe8oSA8F8HXJ=w287-h98-p",
  "https://lh3.googleusercontent.com/DXpJleMtN5bEuyNCMGzpOByCT6GeoREK4hWdGm3RTb7SPSqKaXKT4_fI6-QjIB7h6u4GnJasxjeE=w287-h98-p",
  "https://lh3.googleusercontent.com/O12QuhJebMRbQi3lzQwzzPlLnMjuI-MI8r90F9JlYIXuAXJDzC66h7Fa0C3gcWKxOq4bRtOxmWMS=w287-h98-p",
  "https://lh3.googleusercontent.com/g0phbLkhmEmcwPdNhAuID3QjZEMZfSWNtqGuANTSU2pM6u7awGQA70-npa6cg-IevW5o26iPUlk1=w386-h133-p",
];

export const getRandomCover = () => {
  const index = Math.floor(Math.random() * defaultCovers.length);
  return defaultCovers[index];
};
