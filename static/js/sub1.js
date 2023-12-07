const myList = document.getElementById('myList');
        const mapModal = document.getElementById('mapModal');
        const recommendedList = document.getElementById('recommendedList');

        let items; // items 변수 선언

        fetch('./../json/items.json')
            .then(response => response.json())
            .then(data => {
                items = data; // items 변수에 데이터 할당
                items.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item.name;
                    li.innerHTML = `
                        <img src="${item.imageUrl}" alt="${item.description}" />
                        <div class="item-description">${item.description}</div>
                    <div class="additional-info">${item.additionalInfo}</div>
                    `;
                    li.classList.add('item');
                    li.setAttribute('data-lat', item.latitude);
                    li.setAttribute('data-lng', item.longitude);
                    myList.appendChild(li);
                });

                const itemList = document.querySelectorAll('#myList .item');
                
const itemsArray = Array.from(itemList); // NodeList를 배열로 변환

itemsArray.forEach((item, index) => {
    const itemData = items[index]; // 현재 아이템에 대응하는 데이터 가져오기

    item.addEventListener('click', function() {
        openModal();
        const lat = parseFloat(this.getAttribute('data-lat'));
        const lng = parseFloat(this.getAttribute('data-lng'));
        const container = document.getElementById('kakaoMap');
        const options = {
            center: new kakao.maps.LatLng(lat, lng),
            level: 5,
            zoomControl: true // 줌 컨트롤 활성화
        };
        const map = new kakao.maps.Map(container, options);

        const markerPosition = new kakao.maps.LatLng(lat, lng);
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map); // 맵에 마커 표시

        const content = '<div class="overlay">' + itemData.description + '</div>';
        const overlay = new kakao.maps.CustomOverlay({
            content: content,
            map: map,
            position: markerPosition
        });
        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
            const spotLink = itemData.spot;
            window.open(spotLink);
        });

        // 마커 클릭 시 모달 닫기
        kakao.maps.event.addListener(marker, 'click', function() {
            closeModal();
        });
    });
});


                // 랜덤 아이템 표시 함수 호출
                displayRandomItems(items);
            })
            .catch(error => console.error(error));

        // 모달 열기 함수
        function openModal() {
            mapModal.style.display = 'block';
        }

        // 모달 닫기 함수
        function closeModal() {
            mapModal.style.display = 'none';
        }

        // 랜덤 아이템 표시 함수
        function displayRandomItems(data) {
            const randomItems = getRandomItems(data, 3);
            randomItems.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.name;
                li.innerHTML = `
                    <img src="${item.imageUrl}" alt="${item.description}" />
                    <div class="item-description">${item.description}</div>
                    <div class="additional-info">${item.additionalInfo}</div>
                `;
                recommendedList.appendChild(li);
            });
        }

        // 랜덤 아이템 반환 함수
        function getRandomItems(array, count) {
            const shuffled = array.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        }
        document.addEventListener("scroll", function () {
            const myListItems = document.querySelectorAll("#myList li");
            const recommendedListItems = document.querySelectorAll("#recommendedList li");

            animateElementsOnScroll(myListItems);
            animateElementsOnScroll(recommendedListItems);
        });

        function animateElementsOnScroll(elements) {
            elements.forEach((element, index) => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (elementPosition < windowHeight - 50) {
                    // 요소가 화면에 나타나면 애니메이션 적용
                    element.style.transition = "transform 1s ease";
                    element.style.transform = "translateY(0)";
                } else {
                    // 요소가 화면 밖으로 사라지면 초기 상태로 되돌림
                    element.style.transition = "none";
                    element.style.transform = "translateY(100px)"; // 변경 가능한 값

                }
            });
        }
        
        