module['exports'] = function priceChangeUpdate (hook) {
  console.log(hook.params);

  var request = require('request');
  const cheerio = require('cheerio');
  var Table = require('easy-table');
  var $ = cheerio.load(hook.params.text);
  var output = '```md\n';

  $('h3').each(function(i, header){
      var rows = $($('table>tbody')[i]).find('tr');
      var sign = i % 2 === 0 ? ' ⬆ ' : ' ⬇ ';
      
      output += '# ' + $(header).text() + ' #:\n\n';
      var table = new Table;
      rows.each(function(i, row){
        var cells = $(row).find('td');
        table.cell('Name', $(cells[0]).text());
        table.cell('Team', $(cells[1]).text());
        table.cell('Position', $(cells[2]).text());
        table.cell('Ownership', $(cells[3]).text());
        table.cell('Old Price', $(cells[4]).text());
        table.cell('New Price', $(cells[5]).text());
        table.cell('Diff', $(cells[6]).text());
        table.newRow();
      });
      output += table.toString();
  });

  output += '```';

  var content = {
    "username":"FPL Updates",
    "avatar_url":"https://fantasy.premierleague.com/static/libsass/plfpl/dist/img/facebook-share.png",
    "content": output,
    "embeds":[
        {
          "title": hook.params.title,
          "url": hook.params.url,
          "color":65415,
          "footer":{
              "text": "automated from /r/FantasyPL",
              "icon_url":"https://fantasy.premierleague.com/static/libsass/plfpl/dist/img/facebook-share.png"
          }
        }
    ]
  };

  console.log(content);

  return request.post({
    url: 'https://discordapp.com/api/webhooks/' + hook.env.discord_webhook_id,
    body : content,
    json: true
  },function (err, res, body) {
      if (err) {
        console.log("Error : "+err.message);
        return hook.res.end(err.messsage);
      }
      console.log("Success");
      hook.res.end(body);
  });
};