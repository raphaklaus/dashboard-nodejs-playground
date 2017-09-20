var blessed = require('blessed'),
    contrib = require('blessed-contrib')

var screen = blessed.screen();
//screen.append(table) //must append before setting data
// line.setData([data])

screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
});

var registers = contrib.table(
    {
        keys: true
        , fg: 'white'
        , selectedFg: 'white'
        , selectedBg: 'blue'
        , interactive: true
        , label: 'Active Processes'
        , width: '30%'
        , height: '40%'
        , border: { type: "line", fg: "cyan" }
        , columnSpacing: 8 //in chars
        , columnWidth: [8, 8, 8] /*in chars*/
    })

var instructions = contrib.table(
    {
        keys: true
        , fg: 'white'
        , selectedFg: 'white'
        , selectedBg: 'blue'
        , interactive: true
        , label: 'Active Processes'
        , width: '70%'
        , height: '40%'
        , border: { type: "line", fg: "cyan" }
        , columnSpacing: 8 //in chars
        , columnWidth: [12] /*in chars*/
    })

var screen = blessed.screen()

var grid = new contrib.grid({ rows: 12, cols: 12, screen: screen })

//grid.set(row, col, rowSpan, colSpan, obj, opts)
var map = grid.set(0, 0, 4, 4, contrib.table, { label: 'World Map' })
var box = grid.set(4, 4, 4, 4, blessed.table, { content: 'My Box' })

screen.render()

//allow control the table with the keyboard
instructions.focus();

registers.setData(
    {
        headers: ['register', 'high', 'low'],
        data:
        [
          ['AF', '0x100', '0x80'],
          ['BC', '0x23', '0xFF'],
          ['DE', '0x23', '0xFF'],
          ['SP', '0x23', '0xFF']
        ]
    })

instructions.setData(
    {
        headers: ['instructions'],
        data:
        [
          ['LD A, 2'],
          ['JP $2302'],
          ['CALL $32'],
          ['RST 00']
        ]
    })

screen.append(registers);
screen.append(instructions);
screen.render()