let show_character_name = document.querySelector("#show_character_name");
let show_status = document.querySelector("#show_status");
let online_status = document.querySelector("#online_status");
// let img_link = document.querySelector("#img_link");
let img_center = document.querySelector("#img_center");
let table_character_info = document.querySelector("#table_character_info")
let character_name_search = document.querySelector("#character_name_search");
let btn_search = document.querySelector("#btn_search");
let not_found = document.querySelector("#not_found");
let date_year = document.querySelector("#date_year");

date_year.innerHTML = `&copy  ${new Date().getFullYear()}  &nbsp;|`;

if (character_name_search) {
    character_name_search.addEventListener('keyup', function (e) {
        var key = e.which || e.keyCode;
        if (key == 13) { // Código da tecla enter
            btn_search.onclick();
        }
    });
};

if (btn_search) {
    btn_search.onclick = function () {
        if (character_name_search.value != '') {
            let character_search_final = character_name_search.value.replace(" ", "+");
            let URL = "https://api.tibiadata.com/v3/character/" + character_search_final;

            fetch(URL)
                .then(function (response) {
                    if (!response.ok) throw new Error("Erro ao  executar a requisição");
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);

                    if (data.characters.error) {
                        if (show_character_name)
                            show_character_name.textContent = ''
                        if (show_status)
                            show_status.textContent = ''
                        if (table_character_info)
                            table_character_info.textContent = ''
                        if (online_status)
                            online_status.textContent = ''

                        img_center.src = "./assets/images/default.png"
                        not_found.textContent = data.characters.error
                    }
                    else {
                        not_found.textContent = ''
                        // online_status.textContent = 'Status: '

                        // Character Name
                        show_character_name.textContent = data.characters.character.name

                        // Character Status
                        if (data.characters.character.status === "online") {
                            show_status.textContent = "ONLINE"
                            show_status.style.color = "lawngreen"
                        } else {
                            show_status.textContent = "OFFLINE"
                            show_status.style.color = "red"
                        }


                        // Table Info

                        // Transforma texto em minusculo e primeira letra em maiúsculo
                        function transformTextCharAtToUpper(text) {
                            return text.charAt(0).toUpperCase() + text.slice(1)
                        };

                        // Formatando a data
                        const date = new Date(data.characters.character.last_login);

                        table_character_info.innerHTML = [
                            '<table border="1">',
                            '<caption>CHARACTER INFO</caption>',
                            '<tbody>',
                            '<tr>',
                            '<td>Sex: </td>',
                            '<td>' + transformTextCharAtToUpper(data.characters.character.sex) + '</td>',
                            '<td rowspan="2"><img id="gif_table" src=""></img></td>',
                            '</tr>',
                            '<tr>',
                            '<td>Vocation: </td>',
                            '<td> <a id="img_link" href="#" target="_blank">' + data.characters.character.vocation + '</a></td>',
                            '</tr>',
                            '<tr>',
                            '<td>Level: </td>',
                            '<td colspan="2">' + data.characters.character.level + '</td>',
                            '</tr>',
                            '<tr>',
                            '<td>Achievement Points: </td>',
                            '<td colspan="2">' + data.characters.character.achievement_points + '</td>',
                            '</tr>',
                            '<tr>',
                            '<td>World: </td>',
                            '<td colspan="2">' + data.characters.character.world + '</td>',
                            '</tr>',
                            '<tr>',
                            '<td>Residence: </td>',
                            '<td colspan="2">' + data.characters.character.residence + '</td>',
                            '</tr>',
                            '<tr>',
                            '<td>Last Login: </td>',
                            '<td colspan="2">' + date.toLocaleString() + '</td>',
                            '</tr>',
                            '<tr>',
                            '<td>Account Status: </td>',
                            '<td id="td_account_status" colspan="2">' + data.characters.character.account_status + '</td>',
                            '</tr>',
                            '</tbody>',
                            '</table>',
                        ].join("\n");

                        // console.log(data.characters.character.vocation)
                        // Character Images
                        if (data.characters.character.vocation === "Knight" || data.characters.character.vocation === "Elite Knight") {
                            img_center.src = "./assets/images/knight.png"
                            img_link.href = "https://www.tibiawiki.com.br/wiki/Knight"
                            if (data.characters.character.sex === "male")
                                gif_table.src = "./assets/images/knight_male.gif"
                            else gif_table.src = "./assets/images/knight_female.gif"
                        }
                        else if (data.characters.character.vocation === "Druid" || data.characters.character.vocation === "Elder Druid") {
                            img_center.src = "./assets/images/druid.png"
                            img_link.href = "https://www.tibiawiki.com.br/wiki/Druid"
                            if (data.characters.character.sex === "male")
                                gif_table.src = "./assets/images/druid_male.gif"
                            else gif_table.src = "./assets/images/druid_female.gif"
                        }
                        else if (data.characters.character.vocation === "Paladin" || data.characters.character.vocation === "Royal Paladin") {
                            img_center.src = "./assets/images/paladin.png"
                            img_link.href = "https://www.tibiawiki.com.br/wiki/Paladin"
                            if (data.characters.character.sex === "male")
                                gif_table.src = "./assets/images/paladin_male.gif"
                            else gif_table.src = "./assets/images/paladin_female.gif"
                        }
                        else if (data.characters.character.vocation === "Sorcerer" || data.characters.character.vocation === "Master Sorcerer") {
                            img_center.src = "./assets/images/sorcerer.png"
                            img_link.href = "https://www.tibiawiki.com.br/wiki/Sorcerer"
                            if (data.characters.character.sex === "male")
                                gif_table.src = "./assets/images/sorcerer_male.gif"
                            else gif_table.src = "./assets/images/sorcerer_female.gif"
                        }
                        else {
                            img_center.src = "./assets/images/default.png"
                            img_link.href = "https://www.tibiawiki.com.br/wiki/Voca%C3%A7%C3%A3o"
                            if (data.characters.character.sex === "male")
                                gif_table.src = "./assets/images/none_male.gif"
                            else gif_table.src = "./assets/images/none_female.gif"
                        }


                        // Estilizando o account_status
                        let td_account_status = document.querySelector("#td_account_status");
                        if (data.characters.character.account_status === "Premium Account") {
                            td_account_status.style.color = "lawngreen";
                        } else {
                            td_account_status.style.color = "red";
                        }

                    }

                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    };
}