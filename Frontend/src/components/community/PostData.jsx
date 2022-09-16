const postList = [
    {
      "no": 1,
      "title": "미라클 버드 시즌1 OPEN",
      "content": "미라클 버드 시즌1이 2022년 9월 25일에 오픈됩니다! 많은 관심 부탁드립니다!",
      "createDate": "2022-09-01",
      "readCount": 6,
      "category":1,
    },
    {
      "no": 2,
      "title": "미라클 모닝 신고 범위 안내",
      "content": "다음과 같은 사항은 신고 범위로 인정됩니다. 1. 3일연속 같은 구도의 사진 2. 기상이 확인되지 않는 사진 ",
      "createDate": "2022-09-07",
      "readCount": 5,
      "category":2,
    },
    {
      "no": 3,
      "title": "미라클 버드의 MIRA",
      "content": "MIRA는 미라클 버드 내의 코인이며 다른 페이지에서 사용이 불가합니다.",
      "createDate": "2022-09-08",
      "readCount": 1,
      "category":2,
    },
    {
      "no": 4,
      "title": "미라클 버드 시즌1의 랜드마크 NFT 안내입니다.",
      "content": "미라클 버드 시즌1에서는 서울 36개, 제주도 23개, 광주 19개, 경주 18개, 독도 2개 총 98개가 오픈됩니다.",
      "createDate": "2020-10-25",
      "readCount": 2,
      "category":1,
    },
 
  ];
  
  const getPostByNo = no => {
    const array = postList.filter(x => x.no == no);
    if (array.length == 1) {
      return array[0];
    }
    return null;
  }
  
  export {
    postList,
    getPostByNo
  };