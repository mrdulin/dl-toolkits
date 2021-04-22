const wifi = require('node-wifi');

wifi.init({
  iface: null,
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// disconnected

async function main({ delay, ssids }) {
  for (;;) {
    await sleep(delay);
    wifi
      .scan()
      .then((networks) => {
        return networks.find((n) => n.ssid === ssids[0]);
      })
      .then((targetNetwork) => {
        console.log(targetNetwork);
        console.info(`connect to wifi with ssid = ${ssids[0]}`);
        // return wifi.connect({ ssid: ssids[0] });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

main({
  delay: 5000,
  ssids: ['ZA-Office'],
});
