document.onload = (event) => {
    var btn = document.querySelector("#btn");
    if(btn){
        btn.addEventListener("click", () => parse())
    }
}

function parse() {
    var text = document.querySelector("#text").value;
    var parts = text
        .split("data-original-title=")
        .map(s => s
            .split('\">')[0]
            .replaceAll('<br>', '\n')
            .replaceAll('&nbsp', ' ')
            .replaceAll('&quot;', '\"')
            );
    parts.shift();
    for (let i = 0; i < parts.length; i++) {
        if (parts[i] && parts[i].includes('Правильный ответ'))
        {
            parts[i] = parts[i].split('Ответил')[0] + 'Правильный ответ' + parts[i].split('Правильный ответ')[1];
        }
    }
    var res = "";
    for (let i = 0; i < parts.length; i++) {
        res += '\n';
        res += (1+i) + '. ';
        var answers = [];
        var t = parts[i].split('Правильный ответ:');
        if (t.length === 0 || t.length === 1)
        {
            t = parts[i].split('Ответил:');
        }

        answers.push(t[0]);
        answers.push('Ответ:');
        if (t[1] && t[1].includes('.,'))
        {
            answers.push(t[1].split('.,'));
        }
        else
        {
            answers.push(t[1]);
        }
        answers.forEach(ans => {
            res += ans + '\n';
        });
    }

    document.querySelector("#text").value = res;
}