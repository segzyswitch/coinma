<script setup lang="ts">
// Use Pinia store
import { useUserStore } from '~/store/user';
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const wallet_bal = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(user.value?.wallet_bal);

// Copy WalletId
function copyWalletId() {
  navigator.clipboard.writeText(user?.value?.wallet_id ?? '')
  .then(() => {
    alert('Copied!');
  })
  .catch(() => {
    alert('Failed to copy.')
  });
}
// Copy wallet address
function copyText(text: string) {
  navigator.clipboard.writeText(text)
  .then(() => {
    alert('Copied!');
  })
  .catch(() => {
    alert('Failed to copy.');
  });
}

const selectAsset = ref(null);
const sendType = ref(null);

</script>

<template>
  <header class="bg-dark round-15 p-3 mb-3">
    <h4 class="text-green mb-3">My wallet</h4>
    <div class="w-100 d-flex gap-3 mb-4">
      <p class="my-auto d-none d-sm-block small">#WALLET ID</p>
      <div class="my-auto">
        <span class="btn rounded-3 bg-dark-focus btn-sm text-muted">{{ user?.wallet_id }}</span>
      </div>
      <button class="btn p-0" @click="copyWalletId"><i class="bi bi-copy text-green"></i></button>
    </div>
    <h2 class="text-light mb-4">{{ wallet_bal }}</h2>
    <div class="w-100 d-flex justify-content-around header-icons">
      <button class="btn button my-auto p-0" data-bs-toggle="modal" data-bs-target="#sendModal">
        <span class="icon m-auto"><i class="bi m-auto bi-send"></i></span>
        <span class="text d-block">Send</span>
      </button>
      <button class="btn button my-auto p-0" data-bs-toggle="modal" data-bs-target="#recieveModal">
        <span class="icon m-auto"><i class="bi m-auto bi-send" style="transform: rotate(180deg);"></i></span>
        <span class="text d-block">Recieve</span>
      </button>
      <router-link to="/market/" class="btn button my-auto p-0">
        <span class="icon m-auto"><i class="bi m-auto bi-arrow-left-right"></i></span>
        <span class="text d-block">Exchange</span>
      </router-link>
      <router-link to="/history" class="btn button my-auto p-0">
        <span class="icon m-auto"><i class="bi m-auto bi-clock-history"></i></span>
        <span class="text d-block">History</span>
      </router-link>
    </div>
  </header>

  <!-- Send Modal -->
  <div class="modal fade" id="sendModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="sendModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header text-center row">
          <div class="col-2 col-sm-3 text-start">
            <button v-if="!sendType" class="btn p-1 me-0 text-light" data-bs-dismiss="modal" aria-label="Close">
              <i class="bi bi-arrow-left"></i> <span class="ps-2 d-none d-sm-inline">close</span>
            </button>
            <button v-else class="btn p-1 me-0 text-light" @click="sendType = null">
              <i class="bi bi-arrow-left"></i> <span class="ps-2 d-none d-sm-inline">back</span>
            </button>
          </div>
          <h5 class="modal-title col-8 col-sm-6 my-auto me-auto" id="sendModalLabel"><i class="bi bi-send"></i> Send from wallet</h5>
        </div>
        <div class="modal-body py-5 px-4 text-center">
          <div class="w-100 howtosend" v-if="!sendType">
            <h4 class="mb-2">Choose how to send!</h4>
            <div class="w-100 pt-3">
              <label class="send-options">
                <input v-model="sendType" type="radio" name="send-type" value="crypto" class="check" />
                <div class="button w-100 text-mid btn bg-dark-mid p-3 d-flex mb-3 rounded-3">
                  <div class="rounded-circle aspect-ratio-1x1 my-auto p-2 bg-primary"><i class="bi bi-send px-1"></i></div>
                  <div class="my-auto ps-3 text-start">
                    <p class="m-0">Send crypto</p>
                    <small>Send crypto to an expternal wallet</small>
                  </div>
                </div>
              </label>
              <label class="send-options">
                <input v-model="sendType" type="radio" name="send-type" value="funds" class="check" />
                <div class="button w-100 text-mid btn bg-dark-mid p-3 d-flex mb-3 rounded-3">
                  <div class="rounded-circle aspect-ratio-1x1 my-auto p-2 bg-teal"><i class="bi bi-bank px-1"></i></div>
                  <div class="my-auto ps-3 text-start">
                    <p class="m-0">Send money</p>
                    <small>Send funds to your bank</small>
                  </div>
                </div>
              </label>
            </div>
          </div>
          <div class="w-100 crypto my-forms text-start" v-if="sendType==='crypto'">
            <h5 class="mb-4">Send to external wallet</h5>
            <div class="form-group">
              <label for="address">Select wallet:</label>
              <select class="form-control" id="address" required>
                <option value="btc">Bitcoin</option>
                <option value="eth">Ethereum</option>
                <option value="bnb">Binance</option>
                <option value="usdt">Tether</option>
              </select>
            </div>
            <div class="form-group">
              <label for="amt">Amount:</label>
              <input type="text" class="form-control" id="amt" placeholder="Enter amount" required />
            </div>
            <div class="form-group">
              <label for="address">Wallet Address:</label>
              <input type="text" class="form-control" id="address" placeholder="Enter wallet address" required />
            </div>
            <p class="pt-3 mb-0">
              <button type="button"  class="btn btn-primary px-4 py-2">Continue</button>
            </p>
          </div>
          <div class="w-100 funds my-forms text-start" v-if="sendType==='funds'">
            <h5 class="mb-4">Send to Bank</h5>
            <p class="mb-4">Enter the recipicient bank details below</p>
            <div class="form-group">
              <label for="amt">Amount:</label>
              <input type="text" class="form-control" id="amt" placeholder="Enter amount" required />
            </div>
            <div class="form-group">
              <label for="account">Account number:</label>
              <input type="text" class="form-control" id="account" placeholder="Enter account number" required />
            </div>
            <div class="form-group">
              <label for="name">Account name:</label>
              <input type="text" class="form-control" id="name" placeholder="Enter bank name" required />
            </div>
            <div class="form-group">
              <label for="bname">Bank name:</label>
              <input type="text" class="form-control" id="bname" placeholder="Enter bank name" required />
            </div>
            <div class="form-group">
              <label for="country">Bank region:</label>
              <select class="form-control" required id="country">
                <option value="">Select country</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Aland Islands">Aland Islands</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Anguilla">Anguilla</option>
                <option value="Antarctica">Antarctica</option>
                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Aruba">Aruba</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and Saba</option>
                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                <option value="Botswana">Botswana</option>
                <option value="Bouvet Island">Bouvet Island</option>
                <option value="Brazil">Brazil</option>
                <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                <option value="Brunei Darussalam">Brunei Darussalam</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Central African Republic">Central African Republic</option>
                <option value="Chad">Chad</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Christmas Island">Christmas Island</option>
                <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo">Congo</option>
                <option value="Congo, Democratic Republic of the Congo">Congo, Democratic Republic of the Congo</option>
                <option value="Cook Islands">Cook Islands</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Cote D'Ivoire">Cote D'Ivoire</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Curacao">Curacao</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                <option value="Faroe Islands">Faroe Islands</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="French Guiana">French Guiana</option>
                <option value="French Polynesia">French Polynesia</option>
                <option value="French Southern Territories">French Southern Territories</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Gibraltar">Gibraltar</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Grenada">Grenada</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Guam">Guam</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guernsey">Guernsey</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea-Bissau">Guinea-Bissau</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                <option value="Honduras">Honduras</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Isle of Man">Isle of Man</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jersey">Jersey</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                <option value="Korea, Republic of">Korea, Republic of</option>
                <option value="Kosovo">Kosovo</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Macao">Macao</option>
                <option value="Macedonia, the Former Yugoslav Republic of">Macedonia, the Former Yugoslav Republic of</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Martinique">Martinique</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mayotte">Mayotte</option>
                <option value="Mexico">Mexico</option>
                <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                <option value="Moldova, Republic of">Moldova, Republic of</option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montenegro">Montenegro</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Namibia">Namibia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Netherlands Antilles">Netherlands Antilles</option>
                <option value="New Caledonia">New Caledonia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Niue">Niue</option>
                <option value="Norfolk Island">Norfolk Island</option>
                <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau">Palau</option>
                <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Pitcairn">Pitcairn</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Qatar">Qatar</option>
                <option value="Reunion">Reunion</option>
                <option value="Romania">Romania</option>
                <option value="Russian Federation">Russian Federation</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Saint Barthelemy">Saint Barthelemy</option>
                <option value="Saint Helena">Saint Helena</option>
                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                <option value="Saint Lucia">Saint Lucia</option>
                <option value="Saint Martin">Saint Martin</option>
                <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                <option value="Samoa">Samoa</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Serbia">Serbia</option>
                <option value="Serbia and Montenegro">Serbia and Montenegro</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Sint Maarten">Sint Maarten</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>
                <option value="South Sudan">South Sudan</option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                <option value="Swaziland">Swaziland</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                <option value="Thailand">Thailand</option>
                <option value="Timor-Leste">Timor-Leste</option>
                <option value="Togo">Togo</option>
                <option value="Tokelau">Tokelau</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Viet Nam">Viet Nam</option>
                <option value="Virgin Islands, British">Virgin Islands, British</option>
                <option value="Virgin Islands, U.s.">Virgin Islands, U.s.</option>
                <option value="Wallis and Futuna">Wallis and Futuna</option>
                <option value="Western Sahara">Western Sahara</option>
                <option value="Yemen">Yemen</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
              </select>
            </div>
            <p class="pt-3 mb-0">
              <button type="button"  class="btn btn-success bg-teal px-4 py-2">Send now</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Recieve Modal -->
  <div class="modal fade" id="recieveModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="recieveModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header text-center row">
          <div class="col-2 col-sm-3 text-start">
            <button v-if="!selectAsset" class="btn p-1 me-0 text-light" data-bs-dismiss="modal" aria-label="Close">
              <i class="bi bi-arrow-left"></i> <span class="ps-2 d-none d-sm-inline">close</span>
            </button>
            <button v-else @click="selectAsset=null" class="btn p-1 me-0 text-light">
              <i class="bi bi-arrow-left"></i> <span class="ps-2 d-none d-sm-inline">back</span>
            </button>
          </div>
          <h5 class="modal-title col-8 col-sm-6 my-auto me-auto" id="recieveModalLabel"><i class="bi bi-send" style="transform: rotate(180deg);"></i> Recieve</h5>
        </div>
        <div class="modal-body py-5 px-4 text-center">
          <div class="w-100 howtosend" v-if="!selectAsset">
            <h4 class="mb-4">Choose an asset to receive!</h4>
            <div class="w-100 pt-2">
              <label class="send-options" v-for="i in 5" :key="i">
                <input v-model="selectAsset" type="radio" name="send-type" :value="`crypto${i}`" class="check" />
                <div class="button w-100 text-mid btn bg-dark-mid p-2 d-flex mb-3 rounded-3">
                  <img :src="`/img/assets/${i}.jpg`" width="40" alt="" class="my-auto" />
                  <div class="my-auto ps-2 text-start">
                    <p class="m-0">Bitcoin</p>
                    <p class="m-0">
                      <small>$122480.00</small>
                      <small class="text-success ps-2">+0.34%</small>
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>
          <div class="w-100 crypto my-forms" v-else>
            <h4 class="mb-3">Send to Bitcoin wallet</h4>
            <small class="d-block mb-4">Send only Bitcoin (BTC) to this address, sending other networks or NFTs will result in performance loss</small>
            <div class="form-group py-4">
              <div class="p-3 bg-dark-mid round-15 col-7 mx-auto">
                <img src="/img/qrcode.png" class="w-100" alt="" />
              </div>
            </div>
            <div class="form-group">
              <label for="address">Wallet Address:</label>
              <div class="form-control btn text-truncate">12s7hxFC7QbC9rafCTbYGCNvrq9Rjqr4P4</div>
            </div>
            <p class="mb-0">
              <button type="button" @click="copyText('12s7hxFC7QbC9rafCTbYGCNvrq9Rjqr4P4')" class="btn btn-sm btn-primary px-4 py-2"><i class="bi bi-copy pe-1"></i> Copy address</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
header {
  color: #ccc;
}
.header-icons .button {
  color: #ccc;
  text-align: center;
}
.header-icons .icon {
  font-size: 1.5em;
  color: #ccc;
  display: flex;
  border-radius: 50%;
  width: 60px;
  aspect-ratio: 1;
  background-color: #000;
}

.send-options {
  display: block;
  position: relative;
}
.send-options .check {
  position: absolute;
  right: 15px;
  top: 38%;
  scale: 1.3;
  opacity: 0;
}
.send-options .check:checked + .button {
  border-color: var(--thm-green);
  background-color: var(--thm-dark-focus)!important;
}
.send-options .button:hover {
  background-color: var(--thm-dark-focus)!important;
}
</style>