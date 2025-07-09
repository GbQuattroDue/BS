/**
 * IcoMoon Icon Set - Centralized Export
 * 
 * Este archivo centraliza todas las importaciones de iconos SVG de IcoMoon Set.
 * Proporciona una interfaz única para acceder a todos los iconos disponibles en el proyecto.
 * 
 * Uso:
 * import { IconNames, getIconClass, ICON_CATEGORIES } from '@assets/icons';
 * 
 * Para usar un icono en HTML:
 * <i className={getIconClass('home')}></i>
 * 
 * Para usar un icono en JSX:
 * <span className="icon-home"></span>
 */

// ===== TIPOS DE ICONOS =====

export type IconName =
    // Home & Building
    | 'home' | 'home2' | 'home5' | 'home7' | 'home8' | 'home9' | 'office' | 'city'

    // Content & Documents
    | 'newspaper' | 'magazine' | 'design' | 'pencil' | 'pencil3' | 'pencil4' | 'pencil5'
    | 'pencil6' | 'pencil7' | 'eraser' | 'eraser2' | 'eraser3' | 'quill2' | 'quill4'
    | 'pen' | 'pen-plus' | 'pen-minus' | 'pen2' | 'blog' | 'pen6' | 'brush' | 'spray'

    // Colors & Design Tools
    | 'color-sampler' | 'toggle' | 'bucket' | 'gradient' | 'eyedropper' | 'eyedropper2'
    | 'eyedropper3' | 'droplet' | 'droplet2' | 'color-clear' | 'paint-format' | 'stamp'

    // Media & Images
    | 'image2' | 'image-compare' | 'images2' | 'image3' | 'images3' | 'image4' | 'image5'
    | 'camera' | 'shutter' | 'headphones' | 'headset' | 'music' | 'album' | 'tape'
    | 'piano' | 'speakers'

    // Video & Media Controls
    | 'play' | 'play3' | 'play4' | 'pause' | 'pause2' | 'stop' | 'stop2' | 'previous'
    | 'previous2' | 'next' | 'next2' | 'backward' | 'backward2' | 'forward' | 'forward2'
    | 'forward3' | 'first' | 'last' | 'eject'

    // Audio Controls
    | 'volume-high' | 'volume-medium' | 'volume-low' | 'volume-mute' | 'volume-mute2'
    | 'volume-mute5' | 'volume-increase' | 'volume-decrease' | 'speaker-left' | 'speaker-right'

    // Entertainment
    | 'clapboard-play' | 'clapboard' | 'media' | 'presentation' | 'movie' | 'film'
    | 'film2' | 'film3' | 'film4' | 'video-camera' | 'video-camera2' | 'video-camera-slash'
    | 'video-camera3' | 'dice' | 'chess-king' | 'chess-queen' | 'chess'

    // Communication & Broadcasting
    | 'megaphone' | 'new' | 'connection' | 'station' | 'satellite-dish2' | 'feed'
    | 'feed2' | 'feed3' | 'mic2' | 'mic-off2'

    // Books & Education
    | 'book' | 'book2' | 'book-play' | 'book3' | 'bookmark' | 'bookmark2' | 'bookmark3'
    | 'bookmarks' | 'bookmark4' | 'books' | 'archive' | 'reading' | 'library2' | 'graduation2'

    // Files & Documents
    | 'file-text' | 'profile' | 'file-empty' | 'file-empty2' | 'files-empty' | 'files-empty2'
    | 'file-plus' | 'file-plus2' | 'file-minus' | 'file-minus2' | 'file-download'
    | 'file-download2' | 'file-upload' | 'file-upload2' | 'file-check' | 'file-check2'
    | 'file-eye' | 'file-eye2' | 'file-text2' | 'file-text3' | 'file-picture' | 'file-picture2'
    | 'file-music' | 'file-music2' | 'file-play' | 'file-play2' | 'file-video' | 'file-video2'

    // File Operations
    | 'copy' | 'copy2' | 'copy3' | 'copy4' | 'paste' | 'paste2' | 'paste3' | 'paste4'

    // File Types
    | 'file-zip' | 'file-zip2' | 'file-xml' | 'file-xml2' | 'file-css' | 'file-css2'
    | 'file-presentation' | 'file-presentation2' | 'file-stats' | 'file-stats2'
    | 'file-locked' | 'file-locked2' | 'file-spreadsheet' | 'file-spreadsheet2'
    | 'file-pdf' | 'file-openoffice' | 'file-word' | 'file-excel'

    // Folders
    | 'folder' | 'folder2' | 'folder3' | 'folder4' | 'folder5' | 'folder6' | 'folder-open'
    | 'folder-open2' | 'folder-open3' | 'folder-search' | 'folder-download' | 'folder-download2'
    | 'folder-download3' | 'folder-upload' | 'folder-upload2' | 'folder-upload3'
    | 'folder-plus' | 'folder-plus2' | 'folder-plus3' | 'folder-plus4' | 'folder-minus'
    | 'folder-minus2' | 'folder-minus3' | 'folder-minus4' | 'folder-check' | 'folder-heart'
    | 'folder-remove'

    // Stack Operations
    | 'stack' | 'stack2' | 'stack3' | 'stack4' | 'stack-empty' | 'stack-plus' | 'stack-minus'
    | 'stack-star' | 'stack-picture' | 'stack-down' | 'stack-up' | 'stack-cancel'
    | 'stack-check' | 'stack-text' | 'stack-music' | 'stack-play'

    // Commerce & Shopping
    | 'certificate' | 'cc' | 'price-tag' | 'price-tag2' | 'price-tag3' | 'price-tags'
    | 'price-tags2' | 'barcode2' | 'qrcode' | 'ticket' | 'theater' | 'store' | 'store2'
    | 'cart' | 'cart2' | 'cart4' | 'cart5' | 'cart-add' | 'cart-add2' | 'cart-remove'
    | 'basket' | 'bag'

    // Finance & Money
    | 'percent' | 'coins' | 'coin-dollar' | 'coin-euro' | 'coin-pound' | 'coin-yen'
    | 'piggy-bank' | 'wallet' | 'cash' | 'cash2' | 'cash3' | 'cash4' | 'credit-card'
    | 'credit-card2' | 'calculator2' | 'calculator3' | 'calculator4'

    // Technology & Hardware
    | 'chip' | 'lifebuoy' | 'phone' | 'phone2' | 'phone-slash' | 'phone-wave'
    | 'phone-plus' | 'phone-minus' | 'phone-plus2' | 'phone-minus2' | 'phone-incoming'
    | 'phone-outgoing' | 'phone-hang-up' | 'address-book' | 'address-book2'
    | 'address-book3' | 'notebook'

    // Communication
    | 'envelop' | 'envelop2' | 'envelop3' | 'envelop4' | 'envelop5' | 'mailbox'
    | 'pushpin' | 'location3' | 'location4' | 'compass4' | 'map' | 'map4' | 'map5'
    | 'direction'

    // Time & Date
    | 'reset' | 'history' | 'watch' | 'watch2' | 'alarm' | 'alarm-add' | 'alarm-check'
    | 'alarm-cancel' | 'bell2' | 'bell3' | 'bell-plus' | 'bell-minus' | 'bell-check'
    | 'bell-cross' | 'calendar' | 'calendar2' | 'calendar3' | 'calendar52'

    // Office Equipment
    | 'printer' | 'printer2' | 'printer4' | 'shredder' | 'mouse' | 'mouse-left'
    | 'mouse-right' | 'keyboard' | 'typewriter'

    // Devices & Screens
    | 'display' | 'display4' | 'laptop' | 'mobile' | 'mobile2' | 'mobile3' | 'tablet'
    | 'tv' | 'radio' | 'cabinet' | 'drawer' | 'drawer2' | 'drawer3' | 'drawer-out'
    | 'drawer-in'

    // Storage & Data
    | 'box' | 'box-add' | 'box-remove' | 'download' | 'download4' | 'download7'
    | 'download10' | 'upload' | 'upload4' | 'upload7' | 'upload10' | 'floppy-disk'
    | 'floppy-disks' | 'usb-stick' | 'drive' | 'server' | 'database' | 'database2'
    | 'database4'

    // Database Operations
    | 'database-menu' | 'database-add' | 'database-remove' | 'database-insert'
    | 'database-export' | 'database-upload' | 'database-refresh' | 'database-diff'
    | 'database-edit2' | 'database-check' | 'database-arrow' | 'database-time2'

    // Actions & Editing
    | 'undo' | 'undo2' | 'redo' | 'redo2' | 'rotate-ccw' | 'rotate-cw' | 'rotate-ccw2'
    | 'rotate-cw2' | 'rotate-ccw3' | 'rotate-cw3' | 'flip-vertical' | 'flip-horizontal'
    | 'flip-vertical2' | 'flip-horizontal2' | 'flip-vertical3' | 'flip-vertical4'

    // Alignment & Layout
    | 'angle' | 'shear' | 'align-left' | 'align-center-horizontal' | 'align-right'
    | 'align-top' | 'align-center-vertical' | 'align-bottom'

    // Communication & Social
    | 'forward' | 'reply' | 'reply-all' | 'bubble' | 'bubbles' | 'bubbles2' | 'bubble2'
    | 'bubbles3' | 'bubbles4' | 'bubble-notification' | 'bubbles5' | 'bubbles6'
    | 'bubble6' | 'bubbles7' | 'bubble7' | 'bubbles8' | 'bubble8' | 'bubble-dots3'
    | 'bubble-lines3' | 'bubble9' | 'bubble-dots4' | 'bubble-lines4' | 'bubbles9'
    | 'bubbles10'

    // Users & People
    | 'user' | 'users' | 'users2' | 'users4' | 'user-plus' | 'user-minus' | 'user-cancel'
    | 'user-block' | 'user-lock' | 'user-check' | 'user-tie' | 'collaboration' | 'vcard'
    | 'hat' | 'bowtie'

    // Text & Typography
    | 'quotes-left' | 'quotes-right' | 'quotes-left2' | 'quotes-right2' | 'font'
    | 'ampersand2' | 'ligature' | 'font-size' | 'font-size2' | 'typography' | 'text-height'
    | 'text-width' | 'height' | 'height2' | 'width' | 'bold2' | 'underline2' | 'italic2'
    | 'strikethrough2' | 'strikethrough3'

    // Special Characters & Symbols
    | 'omega' | 'sigma' | 'nbsp' | 'page-break' | 'page-break2' | 'superscript'
    | 'subscript' | 'superscript2' | 'subscript2' | 'text-color' | 'highlight'
    | 'pagebreak' | 'clear-formatting'

    // Tables & Layout
    | 'table' | 'table2' | 'insert-template' | 'pilcrow' | 'ltr' | 'rtl' | 'ltr2'
    | 'rtl2' | 'section'

    // Paragraph Alignment
    | 'paragraph-left2' | 'paragraph-center2' | 'paragraph-right2' | 'paragraph-justify2'
    | 'paragraph-left3' | 'paragraph-center3' | 'paragraph-right3' | 'paragraph-justify3'
    | 'indent-increase' | 'indent-decrease' | 'indent-increase2' | 'indent-decrease2'

    // Loading & Progress
    | 'hour-glass' | 'hour-glass2' | 'hour-glass3' | 'spinner' | 'spinner2' | 'spinner3'
    | 'spinner4' | 'spinner6' | 'spinner9' | 'spinner10' | 'spinner11'

    // Tools & Utilities
    | 'microscope' | 'enlarge' | 'enlarge3' | 'enlarge5' | 'enlarge6' | 'enlarge7'
    | 'shrink' | 'shrink3' | 'shrink5' | 'shrink6' | 'shrink7'

    // Security
    | 'key' | 'lock' | 'lock2' | 'lock4' | 'lock5' | 'unlocked' | 'unlocked2' | 'safe'

    // Tools & Configuration
    | 'wrench' | 'wrench2' | 'wrench3' | 'equalizer' | 'equalizer2' | 'equalizer3'
    | 'equalizer4' | 'cog' | 'cogs' | 'cog2' | 'cog3' | 'cog4' | 'cog52' | 'cog6'
    | 'cog7' | 'hammer' | 'hammer2' | 'hammer-wrench' | 'magic-wand' | 'magic-wand2'

    // Health & Emergency
    | 'pulse2' | 'aid-kit' | 'bug2' | 'construction' | 'traffic-cone' | 'traffic-lights'

    // Charts & Analytics
    | 'pie-chart' | 'pie-chart2' | 'pie-chart3' | 'pie-chart4' | 'pie-chart5'
    | 'pie-chart6' | 'pie-chart7' | 'pie-chart8' | 'stats-dots' | 'stats-bars'
    | 'stats-bars2' | 'stats-bars3' | 'stats-bars4' | 'chart' | 'stats-growth'
    | 'stats-decline' | 'stats-growth2' | 'stats-decline2'

    // Movement & Direction
    | 'stairs-up' | 'stairs-down' | 'stairs' | 'ladder'

    // Awards & Recognition
    | 'rating' | 'rating2' | 'rating3' | 'podium' | 'stars' | 'medal-star' | 'medal'
    | 'medal2' | 'medal-first' | 'medal-second' | 'medal-third' | 'crown' | 'trophy2'
    | 'trophy3' | 'trophy4' | 'diamond'

    // Miscellaneous
    | 'gift' | 'pipe' | 'mustache' | 'cup2' | 'coffee' | 'paw' | 'footprint' | 'rocket'
    | 'meter2' | 'meter-slow' | 'meter-fast' | 'balance' | 'fire' | 'fire2' | 'lab'
    | 'atom' | 'atom2' | 'bin' | 'bin2' | 'briefcase' | 'briefcase3'

    // Transportation
    | 'airplane2' | 'airplane3' | 'airplane4' | 'paperplane' | 'car' | 'car2'
    | 'steering-wheel' | 'gas' | 'bus' | 'truck' | 'bike' | 'road' | 'train' | 'train2'
    | 'ship' | 'boat' | 'chopper'

    // 3D & Geometry
    | 'cube' | 'cube2' | 'cube3' | 'cube4' | 'pyramid' | 'pyramid2' | 'package'
    | 'puzzle' | 'puzzle2' | 'puzzle3' | 'puzzle4' | 'glasses-3d2' | 'brain'

    // Accessibility & Strategy
    | 'accessibility' | 'accessibility2' | 'strategy' | 'target' | 'target2'
    | 'shield-check' | 'shield-notice' | 'shield2' | 'racing' | 'finish'

    // Power & Control
    | 'power2' | 'power3' | 'switch' | 'switch22' | 'power-cord'

    // Clipboard & Lists
    | 'clipboard' | 'clipboard2' | 'clipboard3' | 'clipboard4' | 'clipboard5'
    | 'clipboard6' | 'playlist' | 'playlist-add' | 'list-numbered' | 'list' | 'list2'

    // Layouts & Grids
    | 'more' | 'more2' | 'grid' | 'grid2' | 'grid3' | 'grid4' | 'grid52' | 'grid6'
    | 'grid7' | 'tree5' | 'tree6' | 'tree7' | 'lan' | 'lan2' | 'lan3'

    // Menus & Navigation
    | 'menu' | 'menu2' | 'menu3' | 'menu4' | 'menu5' | 'menu62' | 'menu7' | 'menu8'
    | 'menu9' | 'menu10' | 'circle-small' | 'menu-open' | 'menu-open2' | 'menu-close'
    | 'menu-close2'

    // Cloud & Network
    | 'cloud' | 'cloud2' | 'cloud-download' | 'cloud-download2' | 'cloud-upload'
    | 'cloud-upload2' | 'cloud-check' | 'cloud-check2' | 'import' | 'sphere'
    | 'sphere3' | 'earth'

    // Links & Connections
    | 'link' | 'link2' | 'unlink' | 'unlink2' | 'anchor' | 'flag3' | 'flag4' | 'flag7'
    | 'flag8' | 'attachment' | 'attachment2'

    // Vision & Display
    | 'eye' | 'eye2' | 'eye4' | 'eye-plus' | 'eye-minus' | 'eye-blocked' | 'eye-blocked2'
    | 'spotlight2' | 'starburst' | 'snowflake' | 'weather-windy' | 'fan' | 'umbrella'
    | 'sun3' | 'contrast'

    // Furniture & Home
    | 'bed2' | 'furniture' | 'chair'

    // Ratings & Emotions
    | 'star-empty3' | 'star-half' | 'star-full2' | 'heart5' | 'heart6' | 'heart-broken2'
    | 'thumbs-up2' | 'thumbs-up3' | 'thumbs-down2' | 'thumbs-down3'

    // People & Demographics
    | 'man' | 'woman' | 'man-woman' | 'yin-yang'

    // Cursor & Selection
    | 'cursor' | 'cursor2' | 'lasso2' | 'select2' | 'point-up' | 'point-right'
    | 'point-down' | 'point-left' | 'pointer' | 'reminder'

    // Drag & Touch
    | 'drag-left-right' | 'drag-left' | 'drag-right' | 'touch' | 'multitouch'
    | 'touch-zoom' | 'touch-pinch' | 'hand' | 'grab'

    // Movement & Transformation
    | 'move' | 'dots'

    // Alerts & Status
    | 'warning' | 'warning22' | 'notification2' | 'question3' | 'question4'

    // Mathematical Operations
    | 'plus3' | 'minus3' | 'plus-circle2' | 'minus-circle2' | 'cancel-circle2'
    | 'blocked' | 'cancel-square' | 'cancel-square2' | 'spam'

    // Validation & Status
    | 'cross2' | 'cross3' | 'checkmark' | 'checkmark2' | 'checkmark3' | 'checkmark4'
    | 'checkmark-circle' | 'spell-check' | 'spell-check2'

    // Entry & Exit
    | 'enter' | 'enter2' | 'enter3' | 'enter5' | 'enter6' | 'exit' | 'exit2' | 'exit3'
    | 'wall' | 'fence'

    // Loop & Infinite
    | 'loop' | 'loop3' | 'loop4' | 'infinite' | 'infinite-square' | 'shuffle' | 'wave'
    | 'wave2' | 'split' | 'merge'

    // Arrows - Directional
    | 'arrow-up5' | 'arrow-up7' | 'arrow-up8' | 'arrow-up15' | 'arrow-up16'
    | 'arrow-right5' | 'arrow-right7' | 'arrow-right8' | 'arrow-right15' | 'arrow-right16'
    | 'arrow-down5' | 'arrow-down7' | 'arrow-down8' | 'arrow-down15' | 'arrow-down16'
    | 'arrow-left5' | 'arrow-left7' | 'arrow-left8' | 'arrow-left15' | 'arrow-left16'

    // Arrows - Diagonal
    | 'arrow-up-left2' | 'arrow-up-left3' | 'arrow-up-right2' | 'arrow-up-right3'
    | 'arrow-down-right2' | 'arrow-down-right3' | 'arrow-down-left2' | 'arrow-down-left3'

    // Arrows - Resize
    | 'arrow-resize7' | 'arrow-resize8'

    // Circles with Directions
    | 'circle-up2' | 'circle-right2' | 'circle-down2' | 'circle-left2'

    // Squares with Directions
    | 'square-up' | 'square-up-left' | 'square-up-right' | 'square-right'
    | 'square-down' | 'square-down-right' | 'square-down-left' | 'square-left'

    // Keyboard & Input
    | 'esc' | 'backspace' | 'backspace2' | 'tab' | 'transmission'

    // Sorting & Organization
    | 'sort' | 'move-up2' | 'move-down2' | 'sort-alpha-asc' | 'sort-alpha-desc'
    | 'sort-numeric-asc' | 'sort-numberic-desc' | 'sort-amount-asc' | 'sort-amount-desc'
    | 'sort-time-asc' | 'sort-time-desc'

    // Battery & Power
    | 'battery-6' | 'battery-0' | 'battery-charging'

    // Keyboard Modifiers
    | 'command' | 'shift' | 'ctrl' | 'opt'

    // Form Controls - Checkboxes
    | 'checkbox-checked' | 'checkbox-checked2' | 'checkbox-unchecked' | 'checkbox-unchecked2'
    | 'checkbox-partial' | 'checkbox-partial2'

    // Form Controls - Radio Buttons
    | 'radio-checked' | 'radio-checked2' | 'radio-unchecked'

    // Shapes & Geometry
    | 'square' | 'triangle' | 'triangle2' | 'diamond3' | 'diamond4' | 'circle'
    | 'circle2' | 'circles' | 'circles2'

    // Image Editing
    | 'crop' | 'crop2' | 'make-group' | 'ungroup' | 'vector' | 'vector2' | 'rulers'
    | 'pencil-ruler' | 'scissors' | 'filter3' | 'filter4'

    // Sharing & Embedding
    | 'share' | 'share2' | 'share3' | 'share4' | 'new-tab' | 'new-tab2' | 'popout'
    | 'embed' | 'embed2'

    // Code & Development
    | 'markup' | 'regexp' | 'regexp2' | 'code' | 'circle-css' | 'circle-code'
    | 'terminal' | 'unicode'

    // Seven Segment Display
    | 'seven-segment-0' | 'seven-segment-1' | 'seven-segment-2' | 'seven-segment-3'
    | 'seven-segment-4' | 'seven-segment-5' | 'seven-segment-6' | 'seven-segment-7'
    | 'seven-segment-8' | 'seven-segment-9'

    // Social Media - Google
    | 'google' | 'google-plus' | 'google-plus2' | 'google-drive'

    // Social Media - Facebook & Meta
    | 'facebook' | 'facebook2' | 'instagram'

    // Social Media - Twitter & Communication
    | 'twitter' | 'twitter2'

    // Video Platforms
    | 'youtube' | 'youtube2' | 'youtube3' | 'vimeo' | 'vimeo2'

    // Professional Networks
    | 'linkedin' | 'linkedin2' | 'lanyrd'

    // Photo & Media Sharing
    | 'flickr' | 'flickr2' | 'flickr3' | 'picassa' | 'picassa2' | 'dribbble'
    | 'dribbble2' | 'dribbble3' | 'forrst' | 'forrst2' | 'deviantart' | 'deviantart2'

    // Gaming & Entertainment
    | 'steam' | 'steam2'

    // Cloud Storage
    | 'dropbox' | 'onedrive'

    // Development & Code
    | 'github' | 'github4' | 'github5' | 'codepen' | 'git' | 'svg'

    // Content Management
    | 'wordpress' | 'wordpress2' | 'joomla' | 'blogger' | 'blogger2' | 'tumblr' | 'tumblr2'

    // Search & Web
    | 'yahoo'

    // Operating Systems
    | 'tux' | 'apple2' | 'finder' | 'android' | 'windows' | 'windows8'

    // Audio & Music Platforms
    | 'soundcloud' | 'soundcloud2' | 'lastfm' | 'lastfm2'

    // Communication Platforms
    | 'skype'

    // Social & News
    | 'reddit' | 'delicious' | 'stumbleupon' | 'stumbleupon2' | 'stackoverflow'

    // Visual & Creative
    | 'pinterest2'

    // Professional & Business
    | 'xing' | 'flattr' | 'foursquare'

    // Payment & Finance
    | 'paypal' | 'paypal2' | 'yelp'

    // Software & Applications
    | 'libreoffice'

    // Web Technologies
    | 'html5' | 'html52' | 'css3'

    // Browsers
    | 'chrome' | 'firefox' | 'IE' | 'opera';

// ===== CATEGORÍAS DE ICONOS =====

export const ICON_CATEGORIES = {
    home: ['home', 'home2', 'home5', 'home7', 'home8', 'home9', 'office', 'city'] as const,

    content: ['newspaper', 'magazine', 'design', 'pencil', 'pencil3', 'pencil4', 'pencil5',
        'pencil6', 'pencil7', 'eraser', 'eraser2', 'eraser3', 'quill2', 'quill4',
        'pen', 'pen-plus', 'pen-minus', 'pen2', 'blog', 'pen6', 'brush', 'spray'] as const,

    colors: ['color-sampler', 'toggle', 'bucket', 'gradient', 'eyedropper', 'eyedropper2',
        'eyedropper3', 'droplet', 'droplet2', 'color-clear', 'paint-format', 'stamp'] as const,

    media: ['image2', 'image-compare', 'images2', 'image3', 'images3', 'image4', 'image5',
        'camera', 'shutter', 'headphones', 'headset', 'music', 'album', 'tape',
        'piano', 'speakers'] as const,

    video: ['play', 'play3', 'play4', 'pause', 'pause2', 'stop', 'stop2', 'previous',
        'previous2', 'next', 'next2', 'backward', 'backward2', 'forward', 'forward2',
        'forward3', 'first', 'last', 'eject'] as const,

    audio: ['volume-high', 'volume-medium', 'volume-low', 'volume-mute', 'volume-mute2',
        'volume-mute5', 'volume-increase', 'volume-decrease', 'speaker-left', 'speaker-right'] as const,

    files: ['file-text', 'profile', 'file-empty', 'file-empty2', 'files-empty', 'files-empty2',
        'file-plus', 'file-plus2', 'file-minus', 'file-minus2', 'file-download',
        'file-download2', 'file-upload', 'file-upload2', 'file-check', 'file-check2'] as const,

    folders: ['folder', 'folder2', 'folder3', 'folder4', 'folder5', 'folder6', 'folder-open',
        'folder-open2', 'folder-open3', 'folder-search', 'folder-download', 'folder-upload'] as const,

    commerce: ['certificate', 'cc', 'price-tag', 'price-tag2', 'price-tag3', 'price-tags',
        'price-tags2', 'barcode2', 'qrcode', 'ticket', 'theater', 'store', 'store2',
        'cart', 'cart2', 'cart4', 'cart5', 'cart-add', 'cart-add2', 'cart-remove',
        'basket', 'bag'] as const,

    finance: ['percent', 'coins', 'coin-dollar', 'coin-euro', 'coin-pound', 'coin-yen',
        'piggy-bank', 'wallet', 'cash', 'cash2', 'cash3', 'cash4', 'credit-card',
        'credit-card2', 'calculator2', 'calculator3', 'calculator4'] as const,

    communication: ['envelop', 'envelop2', 'envelop3', 'envelop4', 'envelop5', 'mailbox',
        'pushpin', 'location3', 'location4', 'compass4', 'map', 'map4', 'map5',
        'direction'] as const,

    time: ['reset', 'history', 'watch', 'watch2', 'alarm', 'alarm-add', 'alarm-check',
        'alarm-cancel', 'bell2', 'bell3', 'bell-plus', 'bell-minus', 'bell-check',
        'bell-cross', 'calendar', 'calendar2', 'calendar3', 'calendar52'] as const,

    devices: ['display', 'display4', 'laptop', 'mobile', 'mobile2', 'mobile3', 'tablet',
        'tv', 'radio', 'printer', 'printer2', 'printer4', 'mouse', 'keyboard'] as const,

    storage: ['box', 'box-add', 'box-remove', 'download', 'upload', 'floppy-disk',
        'floppy-disks', 'usb-stick', 'drive', 'server', 'database', 'database2',
        'database4'] as const,

    users: ['user', 'users', 'users2', 'users4', 'user-plus', 'user-minus', 'user-cancel',
        'user-block', 'user-lock', 'user-check', 'user-tie', 'collaboration', 'vcard'] as const,

    tools: ['wrench', 'wrench2', 'wrench3', 'equalizer', 'equalizer2', 'equalizer3',
        'equalizer4', 'cog', 'cogs', 'cog2', 'cog3', 'cog4', 'cog52', 'cog6',
        'cog7', 'hammer', 'hammer2', 'hammer-wrench', 'magic-wand', 'magic-wand2'] as const,

    charts: ['pie-chart', 'pie-chart2', 'pie-chart3', 'pie-chart4', 'pie-chart5',
        'pie-chart6', 'pie-chart7', 'pie-chart8', 'stats-dots', 'stats-bars',
        'stats-bars2', 'stats-bars3', 'stats-bars4', 'chart', 'stats-growth',
        'stats-decline', 'stats-growth2', 'stats-decline2'] as const,

    arrows: ['arrow-up5', 'arrow-up7', 'arrow-up8', 'arrow-up15', 'arrow-up16',
        'arrow-right5', 'arrow-right7', 'arrow-right8', 'arrow-right15', 'arrow-right16',
        'arrow-down5', 'arrow-down7', 'arrow-down8', 'arrow-down15', 'arrow-down16',
        'arrow-left5', 'arrow-left7', 'arrow-left8', 'arrow-left15', 'arrow-left16'] as const,

    social: ['google', 'google-plus', 'google-plus2', 'facebook', 'facebook2', 'instagram',
        'twitter', 'twitter2', 'youtube', 'youtube2', 'youtube3', 'linkedin', 'linkedin2'] as const,

    security: ['key', 'lock', 'lock2', 'lock4', 'lock5', 'unlocked', 'unlocked2', 'safe'] as const,

    transportation: ['airplane2', 'airplane3', 'airplane4', 'paperplane', 'car', 'car2',
        'steering-wheel', 'gas', 'bus', 'truck', 'bike', 'road', 'train',
        'train2', 'ship', 'boat', 'chopper'] as const,

    status: ['warning', 'warning22', 'notification2', 'question3', 'question4', 'checkmark',
        'checkmark2', 'checkmark3', 'checkmark4', 'cross2', 'cross3', 'blocked', 'spam'] as const
} as const;

// ===== FUNCIONES UTILITARIAS =====

/**
 * Genera la clase CSS completa para un icono
 * @param iconName - Nombre del icono (sin el prefijo 'icon-')
 * @returns Clase CSS completa del icono
 */
export function getIconClass(iconName: IconName): string {
    return `icon-${iconName}`;
}

/**
 * Obtiene todos los iconos de una categoría específica
 * @param category - Nombre de la categoría
 * @returns Array de nombres de iconos en esa categoría
 */
export function getIconsByCategory(category: keyof typeof ICON_CATEGORIES): readonly IconName[] {
    return ICON_CATEGORIES[category];
}

/**
 * Busca iconos por término de búsqueda
 * @param searchTerm - Término a buscar en los nombres de iconos
 * @returns Array de nombres de iconos que coinciden con la búsqueda
 */
export function searchIcons(searchTerm: string): IconName[] {
    const term = searchTerm.toLowerCase();
    const allIcons = Object.values(ICON_CATEGORIES).flat();

    return allIcons.filter(icon =>
        icon.toLowerCase().includes(term)
    );
}

/**
 * Verifica si un icono existe
 * @param iconName - Nombre del icono a verificar
 * @returns true si el icono existe, false en caso contrario
 */
export function iconExists(iconName: string): iconName is IconName {
    const allIcons = Object.values(ICON_CATEGORIES).flat();
    return allIcons.includes(iconName as any);
}

/**
 * Obtiene información sobre un icono específico
 * @param iconName - Nombre del icono
 * @returns Objeto con información del icono o null si no existe
 */
export function getIconInfo(iconName: IconName) {
    if (!iconExists(iconName)) return null;

    const category = Object.entries(ICON_CATEGORIES).find(([_, icons]) =>
        (icons as readonly string[]).includes(iconName)
    )?.[0];

    return {
        name: iconName,
        className: getIconClass(iconName),
        category: category || 'unknown',
        unicode: null // Los códigos unicode están en el CSS
    };
}

// ===== CONSTANTES ÚTILES =====

/**
 * Lista de todos los iconos disponibles
 */
export const ALL_ICONS: IconName[] = Object.values(ICON_CATEGORIES).flat();

/**
 * Número total de iconos disponibles
 */
export const TOTAL_ICONS = ALL_ICONS.length;

/**
 * Lista de categorías disponibles
 */
export const CATEGORIES = Object.keys(ICON_CATEGORIES) as (keyof typeof ICON_CATEGORIES)[];

// ===== EXPORT PRINCIPAL =====

/**
 * Objeto principal con toda la funcionalidad de iconos
 */
export const IcoMoonIcons = {
    getClass: getIconClass,
    getByCategory: getIconsByCategory,
    search: searchIcons,
    exists: iconExists,
    getInfo: getIconInfo,
    categories: ICON_CATEGORIES,
    all: ALL_ICONS,
    total: TOTAL_ICONS
} as const;

export default IcoMoonIcons;

// ===== EJEMPLOS DE USO =====

/**
 * EJEMPLOS DE USO:
 * 
 * // Importar funcionalidades específicas
 * import { getIconClass, searchIcons, ICON_CATEGORIES } from './src/assets/icons';
 * 
 * // Usar un icono en JSX
 * <i className={getIconClass('home')} />
 * <span className="icon-user" />
 * 
 * // Buscar iconos
 * const homeIcons = searchIcons('home');
 * const userIcons = getIconsByCategory('users');
 * 
 * // Verificar si existe un icono
 * if (iconExists('custom-icon')) {
 *   // Usar el icono
 * }
 * 
 * // Obtener información de un icono
 * const info = getIconInfo('home');
 * console.log(info?.className); // "icon-home"
 * console.log(info?.category);  // "home"
 * 
 * // Usar el objeto principal
 * import IcoMoonIcons from './src/assets/icons';
 * 
 * const className = IcoMoonIcons.getClass('user');
 * const allUsers = IcoMoonIcons.getByCategory('users');
 * const found = IcoMoonIcons.search('arrow');
 */
