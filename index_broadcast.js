const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// PESAN NYA KALIAN TARO DISINI YAH HARUS DALAM PETIK ' ' SEPERTI INI. KALO MISAL MAU NEW PARAGRAF BISA DI ENTER
// KAYA DIBAWAH
const PESAN = `Halo Binusian! Perkenalkan sebelumnya aku Nazkia selaku FYPL B30. Disini aku mau ngajak kamu untuk menjadi bagian dari FYP B30 sebagai FL/FP.

Jika ada yang ingin ditanyakan atau ingin mendaftar, boleh segera membalas pesan ini atau langsung mendaftar di BinusMaya. Sebelumnya terima kasih dan have a nice day!`;

// LIST NOMOR DISINI YAH 
// JANGAN LEBIH DARI 50 NOMOR DAN HARUS 62 TANPA 0 ATAU +
const NOMOR_LIST = [
  '62895608895333',
  '6281311903115',
  '6282112002217',
  '6281289787979',
  '6285772548931',
  '6282116585857',
  '6281291573509',
  '6281282547647',
  '6289636799749',
  '6285891299324',
  '6287874383673',
  '6282188348760',
  '6289613323976',
  '6287786646168',
  '6287788997351',
  '6281398213776',
  '6281319845775',
  '6281295401284',
  '6287882706412',
  '628174140207',
  '6282288097174',
  '6285559000274',
  '6285743187647',
  '6287736077273',
  '6285811601449',
  '6281288511457',
  '6287808191768',
  '6281585957539',
  '6282250528032',
  '6287711052006',
  '6281383483871',
  '6289601000013',
  '628111614119',
  '6287815778933',
  '6287872412818',
  '6285218618510',
  '6285894969876',
  '6281316966399',
  '6282299009912',
  '6287787648887',
  '6281386303388',
  '6282299843881',
  '6281268368513',
  '6287754431595',
  '6281386508327',
  '6285156057859',
  '628111686575',
  '6281280805832',
  '6281287879085',
  '628175790458',
  '6281380406950',
  '6282283112233',
  '6281386054768',
  '6287885736165',
  '6282299476489',
  '6282385307117',
  '6287881336968',
  '62895333085781',
  '6289637517312',
  '6289654373071',
  '628988123688',
  '6289653092785',
  '6281283799092',
  '6285256551778',
  '62895800211777',
  '6287804173870',
  '6281519059188',
  '6281807453861',
  '6285716273007',
  '6287770349937',
  '6282122211170',
  '6281284513235',
  '6281292188937',
  '62818885096',
  '6281805063550',
  '6281277019315',
  '6281919455845',
  '6281284685280',
  '6282140577890',
  '6285780105891',
  '6287851689422',
  '6282124959694',
  '6281219897725',
  '6285171025038',
  '6285714352385',
  '6281276112022',
  '628881373839',
  '6282297330089',
  '6281905077890',
  '6282150347501',
  '6287777500200',
  '628113487857',
  '6289684915022',
  '6281806245457',
  '628986888488',
  '6288223797495',
  '6281296423524',
  '6281770917537',
  '6287814381854',
  '628569870790',
  '6287879576701',
  '6285779454704',
  '62895604299907',
  '6285256551878',
  '6287883853519',
  '628983803304',
  '6281381100953',
  '6285694228698',
  '6285280527576',
  '6285215833964',
  '6282352562788',
  '6285717969476',
  '6285890929931',
  '6287773440514',
  '628121825996',
  '6281911497766',
  '628119135966',
  '6285890992006',
  '6289678112006',
  '6287789831839',
  '62817382211',
  '6289682256222',
  '6285947373838',
  '6287854454727',
  '62895361525940',
  '6281235261003',
  '628112900243',
  '6282110881386',
  '6289664418778',
  '62082240036577',
  '6281283996394',
  '6285258333300',
  '628816124021',
  '628558831733',
  '6281389978082',
  '6281315856377',
  '628566220603',
  '6285887662318',
  '6282193080323',
  '628119272607',
  '6289669557693',
  '6281903060600',
  '6281517739649',
  '6289681165308',
  '6281520911180',
  '6281546138188',
  '6287851891531',
  '6281310394952',
  '628113609750',
  '6285363373001',
  '6281218677112',
  '6281363020220',
  '6282199003874',
  '6285714352729',
];

// =============================================
// 3. KONFIGURASI (opsional)
// =============================================
const DELAY_ANTAR_PESAN = 120000; // delay dalam ms (120 DETIK / 2 MENIT NGIRIM SATU PESAN). Biar rate spam berkurang

// =============================================
// JANGAN EDIT DI BAWAH INI
// =============================================

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

client.on('qr', (qr) => {
  console.log('\n📱 Scan QR Code ini dengan WhatsApp kamu:\n');
  qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
  console.log('\n✅ WhatsApp terhubung! Mulai broadcast...\n');
  console.log(`📨 Total nomor: ${NOMOR_LIST.length}`);
  console.log(`⏱️  Delay antar pesan: ${DELAY_ANTAR_PESAN / 1000} detik\n`);

  let berhasil = 0;
  let gagal = 0;

  for (let i = 0; i < NOMOR_LIST.length; i++) {
    const nomor = NOMOR_LIST[i];
    const chatId = `${nomor}@c.us`;

    try {
      const isRegistered = await client.isRegisteredUser(chatId);

      if (!isRegistered) {
        console.log(`  [${i + 1}/${NOMOR_LIST.length}] ${nomor} - Tidak terdaftar di WA, skip.`);
        gagal++;
      } else {
        await client.sendMessage(chatId, PESAN);
        console.log(` [${i + 1}/${NOMOR_LIST.length}] ${nomor} - Terkirim!`);
        berhasil++;
      }
    } catch (err) {
      console.log(`❌ [${i + 1}/${NOMOR_LIST.length}] ${nomor} - Error: ${err.message}`);
      gagal++;
    }

    if (i < NOMOR_LIST.length - 1) {
      await delay(DELAY_ANTAR_PESAN);
    }
  }

  console.log('\n=============================');
  console.log(`📊 HASIL BROADCAST:`);
  console.log(`   ✅ Berhasil : ${berhasil}`);
  console.log(`   ❌ Gagal    : ${gagal}`);
  console.log(`   📋 Total    : ${NOMOR_LIST.length}`);
  console.log('=============================\n');

  console.log('✔️  Broadcast selesai! Kamu bisa tutup terminal ini.');
  process.exit(0);
});

client.on('auth_failure', () => {
  console.error('❌ Autentikasi gagal. Hapus folder .wwebjs_auth dan coba lagi.');
});

client.on('disconnected', (reason) => {
  console.log('🔌 WhatsApp terputus:', reason);
});

client.initialize();