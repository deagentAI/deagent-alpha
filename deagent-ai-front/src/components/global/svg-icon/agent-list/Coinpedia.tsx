/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import { IconProps } from "../index";

const CoinpediaIcon: React.FC<IconProps> = (props) => {
  const { width = 20, height = 22, className = "" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 22"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.04977 2.33789L5.13502 2.73939C5.17129 2.72328 5.2082 2.70716 5.24446 2.69238C5.28073 2.67696 5.31631 2.66282 5.35188 2.6501C5.38682 2.63665 5.42102 2.62393 5.45595 2.6125C5.4902 2.60107 5.52376 2.59102 5.55732 2.58096C5.61374 2.56554 5.67282 2.55544 5.72786 2.55007C5.78359 2.5447 5.83661 2.54268 5.88229 2.54401C5.92861 2.5447 5.96754 2.54736 5.99577 2.55007C6.02465 2.55278 6.04278 2.55544 6.04682 2.55544L6.06761 2.55746L6.08708 2.56485L6.10251 2.57761L6.11325 2.59506L6.11862 2.61654V2.64073L6.11256 2.66557L6.10251 2.69041L5.86953 3.12078L5.85544 3.14227L5.83932 3.16109L5.82188 3.1772L5.80108 3.18996L5.79034 3.19602L5.77758 3.2007L5.76683 3.20272L5.75407 3.20474C5.75136 3.20474 5.73865 3.20272 5.71781 3.20204C5.69632 3.2007 5.66676 3.2007 5.6332 3.2007C5.59964 3.2007 5.56269 3.20341 5.52243 3.20878C5.48281 3.21346 5.44186 3.22086 5.40293 3.23229C5.364 3.24303 5.32572 3.25648 5.2861 3.27057C5.24717 3.28535 5.20755 3.30078 5.16725 3.31689C5.12763 3.33434 5.08801 3.35182 5.04706 3.37262C5.00745 3.39144 4.96581 3.41293 4.92555 3.43505C4.87184 3.46462 4.82217 3.49345 4.77649 3.52434C4.73081 3.55524 4.69055 3.58613 4.65227 3.61698C4.61536 3.64788 4.58111 3.67942 4.55155 3.71164C4.52134 3.74387 4.4965 3.7761 4.47433 3.80832C4.45285 3.84188 4.43472 3.8748 4.41929 3.90702C4.40584 3.93994 4.39377 3.97216 4.38638 4.0037C4.37899 4.03593 4.3743 4.06747 4.37293 4.09836C4.37293 4.12926 4.37563 4.16015 4.38165 4.19036C4.38835 4.21721 4.39441 4.24274 4.40515 4.26422C4.41456 4.28571 4.42595 4.30453 4.43871 4.32064C4.45281 4.33607 4.46759 4.3502 4.48503 4.36095C4.50248 4.37036 4.5213 4.37775 4.54278 4.38243C4.56427 4.38711 4.5891 4.38849 4.61596 4.38711C4.64281 4.38574 4.67238 4.38174 4.70593 4.37504C4.73816 4.36765 4.77374 4.35557 4.81134 4.34281C4.85095 4.32936 4.8919 4.31261 4.9362 4.29177L5.42768 4.06485C5.51968 4.02257 5.60695 3.98695 5.68953 3.95876C5.77143 3.92988 5.848 3.90771 5.92118 3.89228C5.99371 3.87686 6.06151 3.86809 6.12395 3.86612C6.1884 3.86479 6.24679 3.86947 6.30119 3.8809C6.3549 3.89233 6.40393 3.91111 6.44754 3.93732C6.49253 3.96348 6.53146 3.99773 6.56571 4.03868C6.59995 4.07963 6.62883 4.12732 6.65435 4.1837C6.67786 4.23943 6.69801 4.30255 6.71275 4.37302C6.72147 4.4153 6.72817 4.45762 6.73157 4.49926C6.73428 4.54154 6.73561 4.58318 6.73492 4.6255C6.7329 4.66714 6.72955 4.70878 6.72216 4.75106C6.71545 4.79201 6.70738 4.83433 6.69599 4.87459C6.68456 4.91756 6.67047 4.9592 6.65504 5.00015C6.63961 5.04179 6.62148 5.08205 6.60202 5.12235C6.58255 5.1633 6.56107 5.20223 6.53756 5.24253C6.51406 5.28215 6.48789 5.32177 6.46104 5.3607C6.43349 5.39963 6.40397 5.4386 6.37377 5.47684C6.34223 5.51513 6.30931 5.55273 6.27438 5.58964C6.23945 5.62723 6.20254 5.6635 6.16425 5.69977C6.12532 5.73603 6.0857 5.77161 6.04274 5.8065C6.02392 5.82128 6.00514 5.83606 5.98632 5.85149C5.9675 5.86558 5.94803 5.88036 5.92926 5.89446C5.90979 5.90924 5.89033 5.92333 5.86949 5.93811C5.84933 5.95221 5.82987 5.96566 5.80972 5.97975L5.9091 6.45846L5.29143 6.79753L5.19406 6.32891C5.14907 6.34971 5.10477 6.36853 5.0618 6.388C5.0175 6.40682 4.97385 6.42357 4.93019 6.44037C4.88791 6.45649 4.84425 6.47191 4.80197 6.48536C4.759 6.49946 4.71736 6.51222 4.67573 6.52429C4.61196 6.54311 4.54278 6.55184 4.47365 6.55519C4.40515 6.55854 4.33735 6.55652 4.2756 6.55184C4.21583 6.54715 4.16281 6.54041 4.12319 6.53439C4.08426 6.52833 4.05943 6.52296 4.0547 6.52232L4.03253 6.51896L4.01508 6.51089L4.0003 6.49812L3.99089 6.47999L3.98685 6.45851L3.98754 6.43569L3.99291 6.41086L4.00297 6.38602L4.25339 5.93016L4.26684 5.90937L4.28295 5.89123L4.3004 5.87581L4.31922 5.86305L4.33331 5.85634L4.34676 5.85166L4.36218 5.84895L4.37563 5.84827C4.37899 5.84895 4.39781 5.85295 4.42668 5.85699C4.45487 5.86167 4.49384 5.86773 4.53879 5.87108C4.58309 5.87577 4.63345 5.87778 4.68312 5.87577C4.73348 5.87306 4.78384 5.86704 4.83085 5.85497C4.87652 5.84152 4.92147 5.82743 4.96714 5.812C5.01282 5.79589 5.05712 5.77909 5.10211 5.76095C5.14641 5.74213 5.19075 5.72336 5.2357 5.70118C5.28 5.68039 5.32232 5.65753 5.36593 5.63471C5.42098 5.6045 5.47336 5.57361 5.5217 5.54138C5.57137 5.50916 5.61838 5.47693 5.66066 5.44268C5.70496 5.40912 5.74591 5.37355 5.7835 5.33793C5.8211 5.3023 5.85604 5.26608 5.88826 5.2278C5.92049 5.1902 5.94803 5.15191 5.97016 5.11432C5.99233 5.07741 6.00978 5.03912 6.02185 5.00152C6.03393 4.96324 6.04067 4.925 6.04265 4.8874C6.04536 4.8498 6.04265 4.81087 6.03393 4.77327C6.02924 4.74642 6.02117 4.72158 6.01111 4.7001C6.0017 4.67728 5.99096 4.65846 5.97686 4.6417C5.96342 4.6249 5.94868 4.61016 5.93054 4.60007C5.9131 4.58864 5.89428 4.57991 5.87348 4.57321C5.85333 4.56715 5.82918 4.56449 5.80297 4.56449C5.77611 4.56449 5.74724 4.56784 5.71433 4.5739C5.68279 4.58129 5.64785 4.5907 5.61026 4.60346C5.57266 4.61553 5.53235 4.63165 5.48938 4.65047L4.92675 4.9103C4.84348 4.94859 4.7636 4.98012 4.6884 5.00565C4.61252 5.03182 4.54136 5.05132 4.47287 5.06473C4.4064 5.07818 4.34263 5.08621 4.28286 5.08823C4.2231 5.08957 4.16805 5.08553 4.11636 5.07414C4.06467 5.06473 4.01766 5.0466 3.97538 5.02043C3.9331 4.99624 3.89615 4.96337 3.86259 4.92242C3.82967 4.88211 3.80149 4.83377 3.77798 4.77873C3.75379 4.723 3.73501 4.65988 3.71959 4.58941C3.7122 4.55048 3.70549 4.5122 3.70347 4.47258C3.69943 4.43365 3.69879 4.39536 3.69943 4.3551C3.70145 4.31617 3.70549 4.2772 3.71086 4.23694C3.71757 4.19732 3.72565 4.15839 3.73639 4.11809C3.74713 4.07778 3.7592 4.03885 3.77399 3.99923C3.78808 3.95962 3.80419 3.92 3.82233 3.8824C3.84046 3.84347 3.85924 3.80587 3.88141 3.76828C3.9022 3.72999 3.9264 3.69239 3.95123 3.65548C3.97676 3.61789 4.00292 3.58162 4.0318 3.54604C4.05999 3.50978 4.08955 3.4742 4.12044 3.43995C4.15198 3.40502 4.18421 3.37013 4.21845 3.33721C4.25339 3.30366 4.28828 3.27143 4.32519 3.2392C4.33997 3.22575 4.35673 3.21235 4.37284 3.19959C4.38895 3.18682 4.40507 3.17342 4.42049 3.1613C4.43794 3.14854 4.45405 3.13646 4.47085 3.12439C4.48765 3.11163 4.5051 3.09955 4.52121 3.08748L4.43596 2.67726L5.04977 2.33789Z"
        fill="black"
      />
      <path
        d="M10.5008 5.43282C10.6008 5.16495 10.6793 4.90039 10.7371 4.63991L8.89948 2.9668C8.86794 3.23535 8.80615 3.51736 8.71484 3.80602L10.5008 5.43282Z"
        fill="black"
      />
      <path
        d="M9.90401 6.6473C10.041 6.42374 10.1632 6.19948 10.2713 5.9739L8.50348 4.36523C8.40345 4.59353 8.28593 4.8238 8.15234 5.05205L9.90401 6.6473Z"
        fill="black"
      />
      <path
        d="M4.80071 8.04102C4.51536 8.15583 4.23473 8.23906 3.96484 8.2874L5.81181 9.96924C6.06894 9.89271 6.33014 9.79332 6.59195 9.67112L4.80071 8.04102Z"
        fill="black"
      />
      <path
        d="M7.11745 9.39515C7.33432 9.2696 7.54916 9.12926 7.7613 8.97419L6.00697 7.37695C5.78877 7.5307 5.56856 7.6663 5.34766 7.78447L7.11745 9.39515Z"
        fill="black"
      />
      <path
        d="M2.81715 2.27239C0.843936 4.44029 0.352502 7.20507 1.71874 8.44915L2.92925 9.55155C3.49055 10.0625 4.27808 10.2364 5.1482 10.1148L3.18307 8.32625C2.79901 8.28797 2.46265 8.15571 2.20149 7.91874C1.14944 6.95933 1.67379 4.59537 3.34824 2.75579C5.02269 0.916853 7.32753 0.172978 8.38096 1.13238C8.67233 1.39759 8.84356 1.77223 8.90195 2.21331L10.8362 3.97434C10.9034 3.04918 10.6603 2.23612 10.0742 1.70305L8.8644 0.601291C7.49808 -0.642741 4.79105 0.105818 2.81715 2.27239Z"
        fill="black"
      />
      <path
        d="M8.20397 8.62402C8.38994 8.46624 8.57255 8.2957 8.75049 8.11446L7.00823 6.5293C6.82966 6.70989 6.64566 6.87773 6.45703 7.03418L8.20397 8.62402Z"
        fill="black"
      />
      <path
        d="M9.13086 7.70397C9.29603 7.51194 9.45046 7.31592 9.59346 7.1165L7.84786 5.52734C7.70821 5.72809 7.5558 5.92614 7.39062 6.11816L9.13086 7.70397Z"
        fill="black"
      />
      <path
        d="M6.55657 17.1183L6.22223 17.1962C6.23701 17.2264 6.25111 17.2573 6.26387 17.2875C6.27732 17.317 6.29004 17.3466 6.30147 17.3768C6.31354 17.4056 6.32428 17.4345 6.33502 17.4634C6.34443 17.4923 6.35384 17.5198 6.3639 17.5479C6.37735 17.595 6.38672 17.6433 6.39277 17.6896C6.39815 17.7366 6.40085 17.7802 6.40085 17.8192C6.40154 17.8575 6.39952 17.8911 6.3975 17.9146C6.39617 17.9387 6.39479 17.9535 6.39415 17.9568L6.39282 17.975L6.38745 17.9911L6.3767 18.0045L6.36192 18.0146L6.34379 18.0186L6.32364 18.0193L6.30348 18.0146L6.28269 18.0066L5.91677 17.8199L5.89795 17.8085L5.88252 17.7957L5.86843 17.7803L5.85768 17.7642L5.85231 17.7541L5.84896 17.7441L5.84625 17.7346L5.84492 17.7246C5.84492 17.7246 5.84561 17.7118 5.84625 17.6937C5.84625 17.6763 5.84694 17.6521 5.84557 17.6239C5.84488 17.595 5.84153 17.5641 5.83749 17.5306C5.83212 17.4977 5.82404 17.4634 5.81399 17.4319C5.80393 17.3997 5.79319 17.3661 5.77974 17.3332C5.76698 17.301 5.75422 17.268 5.73879 17.2352C5.72401 17.2023 5.70725 17.1687 5.69045 17.1358C5.67365 17.1022 5.65487 17.0686 5.63541 17.0344C5.60988 16.9908 5.58372 16.9492 5.5575 16.9116C5.53065 16.8747 5.50379 16.8404 5.47763 16.8095C5.45077 16.778 5.42323 16.7504 5.39573 16.7269C5.36887 16.7028 5.34068 16.682 5.31314 16.6638C5.28495 16.6464 5.25741 16.6316 5.22922 16.6209C5.20168 16.6088 5.17482 16.6001 5.14797 16.594C5.12111 16.5886 5.09426 16.5853 5.06809 16.5853C5.04192 16.5853 5.01704 16.5886 4.99088 16.594C4.96806 16.5994 4.94791 16.6061 4.92977 16.6141C4.91164 16.6229 4.89553 16.633 4.88345 16.645C4.87069 16.6558 4.85926 16.6685 4.85054 16.6833C4.84315 16.6988 4.83709 16.7142 4.83374 16.733C4.8297 16.7511 4.82837 16.7719 4.83039 16.7941C4.83241 16.8169 4.83645 16.8411 4.84384 16.8686C4.8499 16.8962 4.85995 16.9264 4.87202 16.9579C4.88479 16.9894 4.89957 17.0237 4.91701 17.0606L5.11707 17.4682C5.15467 17.544 5.18557 17.6158 5.21173 17.685C5.23726 17.7528 5.25741 17.8172 5.2715 17.8776C5.2856 17.9387 5.29432 17.9958 5.29634 18.0482C5.30038 18.1019 5.29634 18.1509 5.28762 18.1966C5.28023 18.2415 5.26545 18.2832 5.24396 18.3208C5.22179 18.3577 5.19493 18.3913 5.16206 18.4215C5.12782 18.4504 5.08756 18.4759 5.04119 18.4974C4.99487 18.5196 4.94318 18.537 4.8841 18.5504C4.84852 18.5591 4.81294 18.5652 4.77801 18.5685C4.74376 18.5726 4.70818 18.5746 4.67325 18.5746C4.63767 18.5733 4.60209 18.5712 4.56716 18.5672C4.53291 18.5618 4.49734 18.5544 4.46309 18.5471C4.42682 18.537 4.39193 18.5269 4.357 18.5141C4.32207 18.5027 4.28786 18.488 4.25362 18.4725C4.21937 18.457 4.18581 18.4396 4.15157 18.4208C4.11801 18.402 4.08376 18.3812 4.05154 18.3597C4.01729 18.3375 3.98506 18.3127 3.95215 18.2879C3.91923 18.2623 3.8877 18.2355 3.85547 18.2073C3.82393 18.1791 3.79235 18.1482 3.76145 18.1167C3.72991 18.0858 3.69902 18.0522 3.67014 18.018C3.65605 18.0019 3.64398 17.9871 3.63122 17.971C3.61845 17.9555 3.60638 17.9394 3.59293 17.924C3.58086 17.9072 3.56874 17.8917 3.55602 17.8749C3.54395 17.8581 3.53183 17.842 3.51911 17.8253L3.11963 17.9173L2.82422 17.407L3.21562 17.3164C3.1968 17.2795 3.18004 17.2425 3.16324 17.2063C3.14644 17.17 3.1317 17.1337 3.11692 17.0975C3.10214 17.0613 3.08873 17.0263 3.07662 16.9908C3.06317 16.9552 3.05178 16.9203 3.04168 16.886C3.02488 16.8323 3.01552 16.7752 3.01212 16.7175C3.00675 16.6591 3.00744 16.6027 3.0101 16.551C3.01345 16.4999 3.01749 16.4556 3.02218 16.4228C3.02621 16.3899 3.03025 16.3691 3.0309 16.3644L3.03292 16.3469L3.03962 16.3321L3.05105 16.3187L3.0645 16.3106L3.08195 16.3073H3.1021L3.12358 16.3113L3.14373 16.3207L3.53114 16.5201L3.54794 16.5316L3.56405 16.5436L3.5775 16.5584L3.58825 16.5738L3.59362 16.5853L3.59899 16.5973L3.60101 16.6094L3.60234 16.6215C3.60101 16.6235 3.59899 16.6389 3.59564 16.6638C3.5916 16.688 3.58756 16.7215 3.58623 16.7578C3.58288 16.7954 3.58219 16.8377 3.58489 16.88C3.5876 16.9209 3.59362 16.9639 3.60569 17.0022C3.61712 17.0411 3.62988 17.0787 3.64462 17.1163C3.65872 17.1539 3.67281 17.1915 3.68961 17.2284C3.70572 17.2653 3.72317 17.3016 3.74199 17.3379C3.76012 17.3748 3.78027 17.411 3.80038 17.4466C3.82655 17.4923 3.85341 17.5345 3.88164 17.5755C3.90918 17.6165 3.93805 17.6548 3.96689 17.691C3.99645 17.726 4.02597 17.7602 4.05686 17.7911C4.08776 17.822 4.1193 17.8501 4.15152 17.877C4.18375 17.9032 4.21666 17.9253 4.24752 17.9435C4.28043 17.9609 4.31197 17.975 4.34351 17.9838C4.37573 17.9938 4.40796 17.9986 4.4395 17.9999C4.47104 18.0006 4.50327 17.9979 4.53549 17.9891C4.55766 17.9851 4.57846 17.9777 4.59659 17.9697C4.61541 17.961 4.63015 17.9516 4.64425 17.9395C4.6577 17.928 4.66977 17.9146 4.67918 17.8999C4.6879 17.8851 4.69461 17.8697 4.69998 17.8515C4.70402 17.8341 4.70604 17.8146 4.70466 17.7918C4.70466 17.7696 4.70131 17.7461 4.69525 17.7186C4.68988 17.6917 4.68116 17.6622 4.66973 17.6313C4.6583 17.6005 4.6442 17.5669 4.62809 17.5313L4.39847 17.0647C4.36555 16.9955 4.33736 16.9291 4.31455 16.8666C4.29173 16.8035 4.2736 16.7444 4.26084 16.6874C4.24739 16.6316 4.23935 16.5779 4.23733 16.5283C4.23463 16.4786 4.23733 16.4316 4.24541 16.3893C4.2528 16.345 4.26621 16.3054 4.28705 16.2691C4.3072 16.2335 4.3347 16.202 4.36761 16.1731C4.40117 16.1449 4.44014 16.1201 4.48647 16.0993C4.53279 16.0778 4.58516 16.061 4.64493 16.0476C4.67647 16.0395 4.70939 16.0341 4.7423 16.0308C4.77453 16.0274 4.80744 16.0254 4.84031 16.0254C4.87323 16.0261 4.90545 16.0281 4.93901 16.0335C4.97257 16.0368 5.00548 16.0435 5.03973 16.0516C5.07329 16.0597 5.10754 16.0697 5.13976 16.0812C5.17332 16.0919 5.20692 16.1047 5.23915 16.1188C5.27206 16.1335 5.3036 16.149 5.33583 16.1664C5.36806 16.1839 5.40028 16.2027 5.43118 16.2228C5.4634 16.2436 5.4943 16.2645 5.52584 16.2886C5.5554 16.3108 5.58561 16.3349 5.61513 16.3611C5.64533 16.3853 5.6749 16.4128 5.70377 16.4404C5.73196 16.4686 5.76019 16.4974 5.78769 16.5277C5.79976 16.5404 5.8105 16.5545 5.82193 16.5673C5.83268 16.5807 5.84342 16.5934 5.85485 16.6076C5.86559 16.621 5.87633 16.6344 5.88707 16.6485C5.89713 16.6613 5.90856 16.6754 5.91861 16.6902L6.26103 16.6103L6.55657 17.1183Z"
        fill="black"
      />
      <path
        d="M4.07031 21.7436C4.29659 21.8221 4.52015 21.8839 4.73835 21.9262L6.10463 20.3538C5.87904 20.3323 5.64202 20.286 5.39899 20.2148L4.07031 21.7436Z"
        fill="black"
      />
      <path
        d="M3.04297 21.2661C3.23229 21.3769 3.4223 21.4756 3.61364 21.5615L4.92822 20.0482C4.73418 19.969 4.53948 19.875 4.34544 19.7676L3.04297 21.2661Z"
        fill="black"
      />
      <path
        d="M1.7749 17.0191C1.67354 16.7828 1.59834 16.5491 1.55267 16.3242L0.179688 17.9047C0.248824 18.1182 0.336781 18.3357 0.443559 18.5525L1.7749 17.0191Z"
        fill="black"
      />
      <path
        d="M0.683594 18.9866C0.793723 19.1659 0.915238 19.3431 1.05016 19.5184L2.35332 18.0171C2.2217 17.8372 2.10289 17.6552 1.99951 17.4727L0.683594 18.9866Z"
        fill="black"
      />
      <path
        d="M6.56847 15.2432C4.71342 13.6319 2.38705 13.274 1.37058 14.4443L0.472274 15.4795C0.0540158 15.9596 -0.07691 16.6229 0.0418986 17.35L1.50284 15.6682C1.52703 15.3452 1.63174 15.0606 1.8251 14.8383C2.60859 13.9367 4.59994 14.3301 6.17436 15.6977C7.74809 17.0647 8.41681 18.9821 7.63327 19.8838C7.41572 20.1335 7.10557 20.2839 6.73699 20.341L5.29955 21.9967C6.07634 22.0349 6.75246 21.8154 7.18816 21.3138L8.08784 20.2779C9.10298 19.109 8.4242 16.8545 6.56847 15.2432Z"
        fill="black"
      />
      <path
        d="M1.35156 19.8832C1.48786 20.0363 1.63421 20.186 1.78933 20.3317L3.08376 18.8412C2.92933 18.6948 2.78431 18.5431 2.65072 18.3887L1.35156 19.8832Z"
        fill="black"
      />
      <path
        d="M2.14062 20.6395C2.30511 20.7751 2.4723 20.9 2.64216 21.0148L3.9393 19.5223C3.76811 19.4088 3.59959 19.2853 3.4351 19.1504L2.14062 20.6395Z"
        fill="black"
      />
      <path
        d="M14.3906 17.7899C14.6746 17.8624 14.9546 17.9148 15.2272 17.945L16.7385 15.8832C16.4605 15.8798 16.1651 15.8469 15.8603 15.7852L14.3906 17.7899Z"
        fill="black"
      />
      <path
        d="M13.082 17.3096C13.3251 17.4264 13.5674 17.5272 13.8105 17.6124L15.2647 15.6291C15.0197 15.5519 14.7719 15.4572 14.5228 15.3438L13.082 17.3096Z"
        fill="black"
      />
      <path
        d="M11.1039 12.2439C10.9556 11.9639 10.8401 11.6866 10.7615 11.416L9.24219 13.4886C9.34892 13.743 9.47852 13.9988 9.63093 14.2533L11.1039 12.2439Z"
        fill="black"
      />
      <path
        d="M9.96875 14.7607C10.1218 14.9688 10.2877 15.1736 10.4703 15.3737L11.9131 13.4065C11.7325 13.1997 11.5693 12.9889 11.4243 12.7754L9.96875 14.7607Z"
        fill="black"
      />
      <path
        d="M16.7878 9.58499C14.3561 7.80178 11.4738 7.60035 10.3499 9.13313L9.35425 10.4913C8.89302 11.1211 8.80034 11.9456 9.01922 12.8217L10.6346 10.6182C10.6326 10.2208 10.732 9.86222 10.9454 9.56883C11.8129 8.38788 14.2869 8.66718 16.3514 10.1804C18.4139 11.6938 19.4257 13.9704 18.559 15.1521C18.3193 15.4797 17.9554 15.6945 17.5103 15.8027L15.9191 17.9726C16.8725 17.941 17.6774 17.604 18.1595 16.9461L19.1552 15.5885C20.279 14.0558 19.2196 11.3675 16.7878 9.58499Z"
        fill="black"
      />
      <path
        d="M10.875 15.7892C11.0569 15.9624 11.251 16.1309 11.4558 16.2934L12.8885 14.3396C12.6837 14.1758 12.4911 14.0053 12.3118 13.8301L10.875 15.7892Z"
        fill="black"
      />
      <path
        d="M11.918 16.6341C12.1328 16.7818 12.3497 16.918 12.5692 17.0423L14.0046 15.0845C13.7837 14.963 13.5642 14.8293 13.3493 14.6816L11.918 16.6341Z"
        fill="black"
      />
      <path
        d="M14.4301 10.506L14.4396 10.5114L14.4503 10.5168L14.4597 10.5228L14.4691 10.5295L14.4919 10.549L14.5108 10.5712L14.5248 10.5947L14.5343 10.6175L14.6605 11.0431L14.6645 11.0747L14.6545 11.0982L14.6323 11.1123L14.6001 11.115C14.596 11.1143 14.5725 11.1103 14.5376 11.1042C14.5027 11.0989 14.4558 11.0915 14.4047 11.0868C14.3537 11.0814 14.298 11.0774 14.2469 11.0768C14.1945 11.0774 14.1462 11.0814 14.1086 11.0915L13.9965 11.1271L13.8958 11.1708L13.8045 11.2218L13.7219 11.2809C13.6897 11.3078 13.6615 11.3353 13.6366 11.3635C13.6111 11.3917 13.5903 11.4219 13.5729 11.4528C13.5554 11.483 13.5406 11.5146 13.5312 11.5481C13.5212 11.5803 13.5158 11.6146 13.5131 11.6488C13.5111 11.6838 13.5144 11.7187 13.5238 11.7536C13.5319 11.7885 13.5467 11.8234 13.5668 11.8597C13.5863 11.8946 13.6111 11.9308 13.6413 11.9664C13.6722 12.002 13.7078 12.0383 13.7487 12.0745L13.8038 12.1215L13.8588 12.1618L13.9139 12.1974L13.9676 12.2276L13.9998 12.2424L14.0313 12.2552L14.0629 12.2659L14.0944 12.274L14.1783 12.2847L14.2643 12.278L14.3516 12.2545L14.4402 12.2142L14.8202 11.9893C14.8766 11.9564 14.9343 11.9302 14.9934 11.9081C15.0518 11.8866 15.1116 11.8712 15.172 11.8611C15.2324 11.8503 15.2948 11.8449 15.3573 11.8463C15.4198 11.847 15.4829 11.8537 15.5473 11.8651L15.6272 11.8832L15.7085 11.9088L15.7917 11.941C15.8199 11.9531 15.8482 11.9665 15.877 11.9806C15.9173 12.0014 15.9596 12.0243 16.0012 12.0497C16.0435 12.0753 16.0858 12.1021 16.1288 12.133C16.1724 12.1632 16.2161 12.1961 16.2604 12.231C16.3047 12.2659 16.349 12.3036 16.3947 12.3425C16.437 12.3801 16.4779 12.4184 16.5155 12.456C16.5531 12.4942 16.5881 12.5318 16.6203 12.5694C16.6539 12.6077 16.6834 12.646 16.7109 12.6836C16.7384 12.7212 16.7639 12.7594 16.7874 12.797C16.811 12.834 16.8318 12.8709 16.8506 12.9078C16.8687 12.9447 16.8848 12.981 16.8989 13.0173L16.9338 13.124L16.956 13.2281L16.9654 13.3308L16.9614 13.4288C16.9587 13.4617 16.9527 13.4926 16.9453 13.5228C16.9379 13.5544 16.9285 13.5839 16.9171 13.6128L16.9003 13.6491L16.8808 13.684L16.8586 13.7176L16.8351 13.7505L17.2843 14.1466L16.9151 14.4474L16.4767 14.0566L16.3994 14.0983L16.3222 14.1345L16.241 14.1661L16.1591 14.1922C16.1114 14.205 16.0584 14.2124 16.0033 14.2151C15.9483 14.2184 15.8932 14.2178 15.8429 14.2144C15.7932 14.2124 15.7482 14.2077 15.7146 14.2036C15.6817 14.1996 15.6596 14.1962 15.6563 14.1955L15.6401 14.1949L15.6233 14.1915L15.6052 14.1861L15.5871 14.1781L15.5777 14.1734L15.5683 14.1673L15.5588 14.1606L15.5494 14.1552L15.5246 14.1344L15.5044 14.1116L15.489 14.0888L15.479 14.064L15.3541 13.6598L15.3514 13.6309L15.3595 13.6081L15.3789 13.5933L15.4078 13.588L15.4501 13.5913C15.4729 13.5933 15.5051 13.5947 15.5401 13.596C15.5763 13.5967 15.6146 13.596 15.6529 13.5927C15.6911 13.5899 15.7294 13.5839 15.761 13.5745L15.8536 13.5436L15.9416 13.5033L16.0221 13.4557L16.0987 13.3999C16.1316 13.3744 16.1591 13.3476 16.1819 13.3207C16.2054 13.2939 16.2236 13.2663 16.2363 13.2381C16.2504 13.2099 16.2591 13.1811 16.2625 13.1515L16.2612 13.0609L16.2336 12.9682L16.186 12.8776C16.1672 12.8474 16.1443 12.8172 16.1182 12.7883C16.092 12.7594 16.0624 12.7299 16.0309 12.7011L15.9779 12.6568L15.9268 12.6185L15.8765 12.5849L15.8261 12.5574L15.7905 12.5413L15.757 12.5278L15.722 12.5171L15.6878 12.5083L15.6065 12.5016L15.5213 12.5104L15.434 12.5359L15.3447 12.5782L15.0124 12.7762C14.9506 12.8131 14.8875 12.8434 14.8244 12.8682C14.7607 12.8924 14.6968 12.9105 14.6318 12.9219C14.5673 12.9347 14.5022 12.9394 14.4364 12.9387C14.3692 12.938 14.3028 12.9313 14.2343 12.9179L14.1504 12.8985L14.0651 12.8709C14.0362 12.8609 14.0067 12.8501 13.9779 12.8374C13.9483 12.8246 13.9195 12.8112 13.8906 12.7964C13.8483 12.7756 13.8053 12.7521 13.763 12.7266C13.72 12.7004 13.6771 12.6722 13.6341 12.642C13.5898 12.6111 13.5461 12.5782 13.5012 12.5433C13.4575 12.5077 13.4125 12.4707 13.3676 12.4298C13.3219 12.3902 13.2796 12.3499 13.2387 12.3096C13.199 12.2687 13.1614 12.229 13.1272 12.1887C13.0923 12.1498 13.0607 12.1095 13.0312 12.0699C13.0023 12.031 12.9762 11.9913 12.9533 11.951C12.9291 11.9121 12.9083 11.8731 12.8889 11.8342C12.8707 11.7959 12.8546 11.7577 12.8405 11.7194L12.8063 11.6079L12.7861 11.4978C12.7814 11.4615 12.7794 11.426 12.7794 11.3911C12.7801 11.3568 12.7828 11.3226 12.7881 11.2883C12.7935 11.2541 12.8016 11.2212 12.8116 11.1883C12.8217 11.1554 12.8351 11.1225 12.8499 11.0909L12.8721 11.0506L12.8963 11.0117L12.9218 10.9721L12.95 10.9338L12.4297 10.4732L12.7996 10.1758L13.3099 10.6283L13.4012 10.5759L13.4952 10.5302L13.5932 10.4913L13.6952 10.4598C13.7483 10.4457 13.8147 10.4396 13.8859 10.4396C13.9565 10.4383 14.031 10.4436 14.1008 10.451C14.1693 10.4577 14.2317 10.4658 14.2794 10.4739C14.327 10.4806 14.3579 10.4866 14.364 10.4873L14.3794 10.4886L14.3955 10.4927L14.413 10.498L14.4301 10.506Z"
        fill="black"
      />
    </svg>
  );
};

export default memo(CoinpediaIcon);
