/*jshint esversion: 6 */

 var nodeOption = document.getElementById('scatterHost').value;

    ScatterJS.plugins( new ScatterEOS() );

    let api;

    var network = ScatterJS.Network.fromJson({
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        host: nodeOption,
        port: 443,
        protocol: 'https'

    });
    var rpc = new eosjs_jsonrpc.default(network.fullhost());

      ScatterJS.connect('xsov.app', {network}).then(connected => {
            if (!connected) return console.error('no scatter');
            ScatterJS.login().then(id => {
                if (!id) return console.error('no identity');

                api = ScatterJS.eos(network, eosjs_api.default, {rpc});

            });

        });
      



      document.getElementById('doinit').style.visibility = "hidden";

     // Perpetually update that status id
        const setStatus = () => {

        const status = document.getElementById('status');        
            if (!ScatterJS) return status.innerText = 'please login';
            if (!ScatterJS.identity) return status.innerText = 'please login', document.getElementById('loginButton').innerHTML = ' Login <i class="fas fa-key"></i>';
            status.innerText = ScatterJS.identity.accounts[0].name;
            const scatterAccount = ScatterJS.identity.accounts[0].name;
            document.getElementById('loginButton').innerHTML = ' Logout <i class="fas fa-unlock"></i>';


            



         rpc.get_table_rows({
                json: true,
                code: 'sovdexrelays',
                scope: 'EOS',
                table: 'pair'
            }).then(function(value){
                const soveosPrice = value.rows[0].price;

         rpc.get_table_rows({
                json: true,
                code: 'sovdexrelays',
                scope: 'USDT',
                table: 'pair'
            }).then(function(value){
                const sovusdtPrice = value.rows[0].price;

         rpc.get_table_rows({
                json: true,
                code: 'xsovxsovxsov',
                scope: scatterAccount,
                table: 'accounts'
            }).then(function(value){
                var xsovBalance = value.rows[0].balance;
                const xsovBalance0 = parseFloat(xsovBalance).toFixed(4);
                
        rpc.get_table_rows({
                json: true,
                code: 'sovmintofeos',
                scope: scatterAccount,
                table: 'accounts'
            }).then(function(value){
                let sovBalance;
                try {sovBalance = value.rows[0].balance;
                } catch (error) {
                    sovBalance = '0.0000 SOV';
                }
                
                const sovBalance0 = parseFloat(sovBalance).toFixed(4);
                const sovMaxSend = parseFloat(sovBalance0 / 1.01).toFixed(4);

                if (sovBalance && xsovBalance) {document.getElementById('doinit').style.visibility = "hidden";}
                
        rpc.get_table_rows({
                json: true,
                code: 'xsovxsovxsov',
                scope: 'XSOV',
                table: 'stat'
            }).then(function(value){
                const xsovSupply = parseFloat(value.rows[0].supply).toFixed(4);
                    
        rpc.get_table_rows({
                json: true,
                code: 'sovmintofeos',
                scope: 'xsovxsovxsov',
                table: 'accounts'
            }).then(function(value){
                const sovSupply = parseFloat(value.rows[0].balance).toFixed(4);

                var sovXsovValue = (xsovSupply / sovSupply);
                        sovXsovValue = (sovXsovValue * 0.99);
                
              
                

                xsovValue.innerText = parseFloat(sovSupply / xsovSupply).toFixed(4);

                var xsovSovPrice = (sovSupply / xsovSupply);

                var xsovUserValueStat = (xsovBalance0 * xsovSovPrice).toFixed(4);

                var xsoveosValue = (xsovUserValueStat * soveosPrice).toFixed(4);

                var xsovusdtValue = (xsovUserValueStat * sovusdtPrice).toFixed(4);

                var eosTvl = (sovSupply * soveosPrice).toFixed(4);

                var usdtTvl = (sovSupply * sovusdtPrice).toFixed(4);

                xsovBalanceValueStat.innerText = (xsovBalance);
                xsovValueStat.innerText = (xsovUserValueStat + ' SOV');
                xsoveosValueStat.innerText = (xsoveosValue + ' EOS');
                xsovusdtValueStat.innerText = (xsovusdtValue + ' USDT');

                sovTvlstat.innerText = (sovSupply + " SOV");
                eosTvlstat.innerText = (eosTvl + " EOS");
                usdtTvlstat.innerText = (usdtTvl + " USDT");

                document.getElementById("sovSend").placeholder = "Max = " + sovMaxSend + " SOV";
                document.getElementById("myRange").max = sovMaxSend;
                document.getElementById("xsovSend").placeholder = "Max = " + xsovBalance;
                document.getElementById("myRange0").max = xsovBalance0;

                var sovSendAmount = document.getElementById('sovSend').value;
                var xsovSendAmount = document.getElementById('xsovSend').value;
                

                if (sovSendAmount > 0) {

                    var xsovMintAmount = (sovSendAmount * sovXsovValue).toFixed(4);

                }   else {
                    var xsovMintAmount = "";
                }

              


                if (xsovSendAmount > 0) {

                    var sovWithdrawAmount = (xsovSendAmount * xsovSovPrice).toFixed(4);

                }   else {
                    var sovWithdrawAmount = "";
                }



                sovXsovConversionDiv.innerText = ('Deposit ' + sovSendAmount + ' SOV');
                sovXsovConversionDiv2.innerText = ('Receive ' + xsovMintAmount + ' XSOV');
                

                xsovSovConversionDiv.innerText = ('Destroy ' + xsovSendAmount + ' XSOV');
                xsovSovConversionDiv2.innerText = ('Withdraw ' + sovWithdrawAmount + ' SOV');





                
            });


            });

            });

            });

            });

            

            }).catch(err => {
                    console.error('error thrown: ', err);
                    document.getElementById('doinit').style.visibility = "visible";
                });

            };

setStatus();
setInterval(() => {
    setStatus();
}, 500);


function changeNode() {
    nodeOption = document.getElementById('scatterHost').value;

    network = ScatterJS.Network.fromJson({
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        host: nodeOption,
        port: 443,
        protocol: 'https'

    });
    rpc = new eosjs_jsonrpc.default(network.fullhost());
    api = ScatterJS.eos(network, eosjs_api.default, {rpc});

    alert('You successfully changed the node to ' + nodeOption);



    setStatus();
}




function help(){
    if (confirm("Click OK to speak with the developers on Telegram.") == true) 
        {window.open("https://t.me/eossov");} 

    else {return false;}

}

function showVal(val) {


                        document.getElementById('sovSend').value = val;

                        
                    } 


function showVal0(val) {


                        document.getElementById('xsovSend').value = val;

                        
                    } 


function signInOut() {
    if (!ScatterJS) return ScatterJS.login();
    if (!ScatterJS.identity) return ScatterJS.login();
    else    {
                ScatterJS.logout();
            }
     
}




function mintXsov(){
            ScatterJS.login().then(id => {
                if (!id) return console.error('no identity');
                const account = ScatterJS.account('eos');

                rpc.get_table_rows({
                json: true,
                code: 'xsovxsovxsov',
                scope: 'XSOV',
                table: 'stat'
            }).then(function(value){
                const xsovSupply = parseFloat(value.rows[0].supply).toFixed(4);
                    
            rpc.get_table_rows({
                json: true,
                code: 'sovmintofeos',
                scope: 'xsovxsovxsov',
                table: 'accounts'
            }).then(function(value){
                const sovSupply = parseFloat(value.rows[0].balance).toFixed(4);

            


                var sovSendAmount = document.getElementById('sovSend').value;
                var sovSendAmount0 = document.getElementById('sovSend').value;
                sovSendAmount = format_eos_amount(sovSendAmount) + " SOV";
                sovSendAmount0 = format_eos_amount(sovSendAmount0);
                var sovSendAmountBurn = (sovSendAmount0 * 0.01).toFixed(4) + " SOV";

                var sovXsovPrice = parseFloat(xsovSupply / sovSupply);
                var sovXsovConversion = ((sovSendAmount0 * sovXsovPrice)*0.99).toFixed(4);
         
                if (confirm("Deposit " + sovSendAmount + " to receive " + sovXsovConversion + " XSOV (SOV transfer burn of " + sovSendAmountBurn + " will be deducted seperately from your account balance)") == true) {

                api.transact({
                    actions: [{
                        account: 'sovmintofeos',
                        name: 'transfer',
                        authorization: //user paying for resources must go first
                            [{

                            actor: account.name,
                            permission: account.authority,

                        }],
                        data: {
                            //todo:pass in data object
                            from: account.name,
                            to: 'xsovxsovxsov',
                            quantity: sovSendAmount,
                            memo: ''
                            
                        }
                    }]

                }, {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }).then(res => {
                    console.log('sent tx: ', res);
                    alert('You successfully deposited ' + sovSendAmount + '. You received ' + sovXsovConversion + ' XSOV');
                }).catch(err => {
                    console.error('error thrown: ', err);
                    alert(err);
                });
            }

            else {return false;}
             });

            });
            

        });

        }


function burnXsov(){
            ScatterJS.login().then(id => {
                if (!id) return console.error('no identity');
                const account = ScatterJS.account('eos');
                var xsovSendAmount = document.getElementById('xsovSend').value;
                xsovSendAmount = format_eos_amount(xsovSendAmount) + " XSOV";
                var xsovSendAmount0 = document.getElementById('xsovSend').value;

                
                rpc.get_table_rows({
                json: true,
                code: 'xsovxsovxsov',
                scope: 'XSOV',
                table: 'stat'
            }).then(function(value){
                const xsovSupply = parseFloat(value.rows[0].supply).toFixed(4);
                    
        rpc.get_table_rows({
                json: true,
                code: 'sovmintofeos',
                scope: 'xsovxsovxsov',
                table: 'accounts'
            }).then(function(value){
                const sovSupply = parseFloat(value.rows[0].balance).toFixed(4);
                var xsovSovPrice = (sovSupply / xsovSupply);
                var xsovSovConversion = (xsovSendAmount0 * xsovSovPrice).toFixed(4);
                var sovXtransferBurn = (xsovSovConversion * 0.01).toFixed(4) + " SOV";

                if (confirm("Destroy " + xsovSendAmount + " to withdraw " + xsovSovConversion + " SOV (SOV transfer burn of " + sovXtransferBurn + " will be deducted seperately from the transfer)") == true) {

                api.transact({
                    actions: [{
                        account: 'xsovxsovxsov',
                        name: 'transfer',
                        authorization: //user paying for resources must go first
                            [{

                            actor: account.name,
                            permission: account.authority,

                        }],
                        data: {
                            //todo:pass in data object
                            from: account.name,
                            to: 'xsovxsovxsov',
                            quantity: xsovSendAmount,
                            memo: ''
                            
                        }
                    }]

                }, {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }).then(res => {
                    console.log('sent tx: ', res);
                    alert('You successfully destroyed ' + xsovSendAmount + ' and withdrew ' + xsovSovConversion + ' SOV');
                }).catch(err => {
                    console.error('error thrown: ', err);
                    alert(err);
                });
            }

            else {return false;}
             });

            });

        });

        }



        function doinit(){
            ScatterJS.login().then(id => {
                if (!id) return console.error('no identity');
                const account = ScatterJS.account('eos');

                if (confirm("Initialize XSOV Contract") == true) {

                api.transact({
                    actions: [{
                        account: 'xsovxsovxsov',
                        name: 'open',
                        authorization: //user paying for resources must go first
                            [{

                            actor: account.name,
                            permission: account.authority,

                        }],
                        data: {
                            //todo:pass in data object
                            owner: account.name,
                            symbol: '4,XSOV',
                            ram_payer: account.name
                            
                            
                        }
                    },


                    ]

                },



                 {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }).then(res => {
                    console.log('sent tx: ', res);
                    alert('You successfully initialized the XSOV Contract');
                }).catch(err => {
                    console.error('error thrown: ', err);
                    alert(err);
                });
            }

            else {return false;}
           

        });

        }


function format_eos_amount(amount) {
    amount2 = parseFloat(amount).toFixed(4);
        return (amount2);
    }

