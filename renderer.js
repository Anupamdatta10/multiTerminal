var os = require("os");
var pty = require("node-pty");
var Terminal = require("xterm").Terminal;


var terminalName = document.getElementById("terminalname");
var Add_div=document.getElementById("add_terminal");

const body=document.getElementById("main_body");
// Initialize node-pty with an appropriate shell
//const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];
const PAUSE = '\x13';   // XOFF
const RESUME = '\x11';  // XON

var xterm=[] 

var ptyProcess =[] 
var i=0
let xtem_obj;
let pty_op


Add_div.addEventListener("click",function(){
    addTterminal()
    terminalName.selectedIndex = terminalName.options.length-1;
    
    var num = terminalName.value;
   
    document.getElementById('part'+num).style.zIndex=199;
})

window.addEventListener("load", function () {
    addTterminal()
})


terminalName.addEventListener("change", function () {

    var num = terminalName.value;
    
    
    xtem_obj = xterm[num];
    console.log(num)
    for(j in ptyProcess)
    {
        ptyProcess[j].write(PAUSE)
        document.getElementById('part'+j).style.zIndex=j;
        
    }
    pty_op = ptyProcess[num]
    pty_op.write(RESUME)
    document.getElementById('part'+num).style.zIndex=99;
  
   
})

function addTterminal()
{
    
    let pty_obj=pty.spawn("powershell.exe", [],{handleFlowControl: true}, {
        name: "xterm-color"+i,
        cols: 80,
        rows: 30,
        cwd: process.cwd(),
        env: process.env,
    });
    ptyProcess.push(pty_obj)
    xterm.push(new Terminal())
    
    var tag = document.createElement("div");
    var addOption=document.createElement("option");
    var text = document.createTextNode((i+1)+":powershell");
    addOption.appendChild(text);

    addOption.setAttribute('value',i)
   

    terminalName.appendChild(addOption);
    let id='part'+i
    tag.setAttribute('id',id);
    body.appendChild(tag);
    var element=document.getElementById(id);
    xtem_obj=xterm[i]
    xtem_obj.open(element)
    pty_op=ptyProcess[i];
   
    xtem_obj.onData(data => pty_op.write(data));
    pty_op.on('data', function (data) {
    xtem_obj.write(data)
        
    })
    i++
}