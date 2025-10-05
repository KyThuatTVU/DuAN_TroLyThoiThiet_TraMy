window.getWeather = async function() {
  const city = document.getElementById('city').value;
  if(!city) return alert('Nhập tên thành phố nhé!');

  try {
    document.getElementById('result').innerHTML = 'Đang tải dữ liệu...';
    const res = await fetch(`/getWeatherJSON?city=${city}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    if(data.error){
      document.getElementById('result').innerHTML = `<p style="color: red">${data.error}</p>`;
    } else {
      document.getElementById('result').innerHTML = `
        <b>Thành phố:</b> ${city} <br>
        <b>Nhiệt độ:</b> ${data.temp}°C <br>
        <b>Độ ẩm:</b> ${data.humidity}% <br>
        <b>Thời tiết:</b> ${data.description}
      `;
    }
  } catch (err) {
    document.getElementById('result').innerHTML = `<p style="color: red">Lỗi khi lấy dữ liệu thời tiết: ${err.message}</p>`;
    console.error('Error:', err);
  }
}
