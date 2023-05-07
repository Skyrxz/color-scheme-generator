document.body.addEventListener('click', e => {
    let colorPicker = document.getElementById('color').value.replace('#', '')
    let mode = document.getElementById('mode').value

    if(e.target.id == 'get-color-btn') {
        let finalHtml;
        fetch(`https://www.thecolorapi.com/scheme?hex=${colorPicker}&count=6&mode=${mode}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => setColorHtml(useColorData(data)))    
        
    }
})

setColorHtml(useColorData(data))

function useColorData(data) {
    const colorObj = data;
    let finalColorArray = []

    colorObj.colors.forEach(color => {
        let currentcolor = color.hex.value;
        finalColorArray.push(currentcolor)
    })

    return finalColorArray
}

function setColorHtml(array) {
    let html = ``
    
    array.forEach(el => {
        html += `
        <div class="w-96 h-full flex flex-col-reverse" style="background-color: ${el};">
            <div class="bg-slate-950 text-white text-center p-4">
                ${el}
            </div>
        </div>
        `
    });

    document.getElementById('color-pallete').innerHTML = html;
    return html
}