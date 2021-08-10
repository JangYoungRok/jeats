let mapSearchByAddress = function (map, targetId, geoInput, $name, $address) {
    let $name_val = $name.val().trim()
    let $address_val = $address.val().trim()

    if ($name_val.length > 12) {
        $name_val = $name_val.slice(0, 12) + '...';
    }
    // kakao geocoder 가져옮
    let geocoder = new kakao.maps.services.Geocoder()

    geocoder.addressSearch($address_val, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
            // 검색이 잘 되었으면
            // 위도 경도를 세팅하고 지도를 이동
            let coords = new kakao.maps.LatLng(result[0].y, result[0].x)
            console.log(result[0])
            $(geoInput).val(
                result[0].x + ',' + result[0].y
            )

            let imageSrc = '/static/images/icon_pointer.png'
            let imageSize = new kakao.maps.Size(40, 46)
            let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)

            let marker = new kakao.maps.Marker({
                map: map,
                position: coords,
                image: markerImage
            })

            let infoWindow = new kakao.maps.InfoWindow({
                content: '<div style="width:150px;text-align:center;padding:6px 2px">' + $name_val + '</div>'
            })

            infoWindow.open(map, marker)


            // 경로에 위치로 지도 움직이기
            map.setCenter(coords)
            // 지도 div 보이게 하기
            $(targetId).css('visibility', 'visible')


        } else {
            alert('데이터가 존재하지 않습니다. 다시 검색해 주세요')
            $(geoInput).val('')
            $(address).val('')
            $(targetId).css('visibility', 'hidden')

        }
    })
}