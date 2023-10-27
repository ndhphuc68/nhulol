<template>
  <div class="guide-item">
    <h4 class="title-guide">Baccarat</h4>
    <div>
      <p>{{$t('baccarat_rule_1')}}</p><br/>

      <h3>{{$t('baccarat_rule_h1')}}</h3>
      <ul>
        <li>{{$t('baccarat_rule_desc1')}}</li>
      </ul>
      <p><img align="absmiddle" src="@/assets/gameRule/bakara_05.png" width="101" height="128"> + <img align="absmiddle" src="@/assets/gameRule/bakara_02.png" width="101" height="128"></p>
      <ul>
        <li>{{$t('baccarat_rule_desc2')}}</li>
      </ul>
      <p><img align="absmiddle" src="@/assets/gameRule/bakara_03.png" width="101" height="128"> + <img align="absmiddle" src="@/assets/gameRule/bakara_04.png" width="101" height="128"> + <img align="absmiddle" src="@/assets/gameRule/bakara_05.png" width="101" height="128"></p><br/>
      <h3>{{$t('baccarat_rule_h2')}}</h3>
      <table width="100%" border="0" cellpadding="1" cellspacing="1">
        <tbody><tr>
          <th width="50%">{{$t('baccarat_rule_desc3')}}</th>
          <th width="50%">{{$t('baccarat_rule_desc4')}}</th>
        </tr>
        <tr>
          <td>0, 1, 2, 3, 4, 5</td>
          <td>{{$t('baccarat_rule_desc5')}}</td>
        </tr>
        <tr>
          <td>6, 7</td>
          <td>{{$t('baccarat_rule_desc6')}}</td>
        </tr>
        <tr>
          <td>8, 9</td>
          <td>{{$t('baccarat_rule_desc7')}}</td>
        </tr>
        </tbody></table>
      <p>{{$t('baccarat_rule_2')}}</p><br/>
      <h3>{{$t('baccarat_rule_h3')}}</h3>
      <table width="100%" border="0" cellpadding="1" cellspacing="1">
        <tbody><tr>
          <th width="50%">{{$t('baccarat_rule_desc8')}}</th>
          <th width="50%">{{$t('baccarat_rule_desc9')}}</th>
        </tr>
        <tr>
          <td>0,1,2,3,4,5</td>
          <td>{{$t('baccarat_rule_desc5')}}</td>
        </tr>
        <tr>
          <td>6,7</td>
          <td>{{$t('baccarat_rule_desc6')}}</td>
        </tr>
        <tr>
          <td>8,9</td>
          <td>{{$t('baccarat_rule_desc7')}}</td>
        </tr>
        </tbody></table>
      <p>{{$t('baccarat_rule_3')}}</p><br/>
      <h3>{{$t('baccarat_rule_h4')}}</h3>
      <p><img src="@/assets/gameRule/bakara_06.jpg" width="493" height="360"></p>
      <p>{{$t('baccarat_rule_desc10')}}</p>
    </div>
  </div>
</template>
<script setup>
</script>
<style scoped>
.guide-item{
  width: 100%;
}
.title-guide {
  margin-top: 16px;
  color: var(--primary);
}
</style>