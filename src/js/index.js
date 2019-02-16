$.ajax({
	url: '/list',
	dataType: 'json',
	success: function(res) {
		random(res.msg)
	}
})

function random(data) {
	var str = ''
	$.each(data, function(index, item) {
		str +=`<ul>
						<li>
							<img src="${item.src}" alt="">
						</li>
						<li>
							${item.sugar}
						</li>
						<li>${item.Specifications}</li>
						<li>${item.money}</li>
			</ul>`
	})
	$('.variety').append(str)
}
