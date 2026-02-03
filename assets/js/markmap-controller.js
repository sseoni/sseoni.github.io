function initMarkmap(graphData) {
    // Markmap 라이브러리가 로드되었는지 확인
    if (!window.markmap) {
      console.error("Markmap library not loaded");
      return;
    }
  
    const { Markmap } = window.markmap;
    const svg = document.querySelector('#markmap-svg');
    
    // 기존 그래프가 있다면 삭제 (재렌더링 시 중복 방지)
    svg.innerHTML = "";
  
    const handleNodeClick = (el, data) => {
      const title = document.getElementById('node-title');
      const desc = document.getElementById('node-desc');
      
      // 클릭된 노드 내용 업데이트
      title.innerText = data.content;
      
      // payload가 있으면 설명 표시, 없으면 기본 메시지
      if (data.payload && data.payload.desc) {
        desc.innerText = data.payload.desc;
      } else {
        desc.innerText = "상세 설명이 없는 항목입니다.";
      }
    };
  
    Markmap.create(svg, {
      paddingX: 20,
      autoFit: true,
      initialExpandLevel: 2, // 처음에 2단계까지만 펼치기
      onClick: handleNodeClick
    }, graphData);
  }