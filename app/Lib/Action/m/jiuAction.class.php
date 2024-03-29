<?php
class jiuAction extends FirstendAction {
	public function _initialize() {
		parent::_initialize();
		$this->_mod = D("items");
		$this->_cate_mod = D('items_cate');
		if (false === $cate_list = F('cate_list')) {
			$cate_list = $this->_cate_mod->cate_cache();
		}
		$this->assign('cate_list', $cate_list); //ио└Я
	}
	
	public function _empty(){
		$this->index();
	}

    /**
	 ** 首页（全部）
	 **/
    public function index() {
		$cid = $this->_get('cid');
		$k = $this->_get('k');
		if($k){$where['title'] = array('like','%'.$k.'%');}
		$order = 'volume desc ';
		if($cid){
			$this->assign('cid',$cid);
			$cinfo = $this->_cate_mod->where(array('id'=>$cid))->find();
			if($cinfo['shop_type']){$where['shop_type'] = $cinfo['shop_type'];}
				if($cinfo['mix_price']>0){$where['coupon_price'] = array('egt',$cinfo['mix_price']);}
				if($cinfo['max_price']>0){$where['coupon_price'] = array('elt',$cinfo['max_price']);}
				if($cinfo['max_price']>0 && $cinfo['mix_price']>0){$where['coupon_price'] = array(array('egt',$cinfo['mix_price']),array('elt',$cinfo['max_price']),'and');}
				if($cinfo['mix_volume']>0){$where['volume'] = array('egt',$cinfo['mix_volume']);}
				if($cinfo['max_volume']>0){$where['volume'] = array('elt',$cinfo['max_volume']);}
				if($cinfo['max_volume']>0 && $cinfo['mix_volume']>0){$where['volume'] = array(array('egt',$cinfo['mix_volume']),array('elt',$cinfo['max_volume']),'and');}
				if($cinfo['thiscid']==0){
			  $id_arr = $this->_cate_mod->get_child_ids($cid, true);
			  $where['cate_id'] = array('IN', $id_arr);
					$today_wh['cate_id'] = array('IN', $id_arr);
			}
			
			$order.= ', '.$cinfo['sort'];
		}else{
			//$where['coupon_price'] = array('egt','9');
			$where['coupon_price'] = array('elt','9.9');
		}
		
		$where['ems'] = 1;
		$where['status'] = 'underway';
		$where['pass'] = '1';
		$where['isshow'] = '1';
		$page_size = C('ftx_index_page_size');
		$p = $this->_get('p','intval', 1); 
		$start = $page_size * ($p - 1) ;
		$items_list = $this->_mod->where($where)->order($order)->limit($start . ',' . $page_size)->select();
		$this->assign('items_list', $items_list);
		$count = $this->_mod->where($where)->count();
		$this->assign('total_item',$count);
		$pager = $this->_pager($count, $page_size);
		$this->assign('page', $pager->mshow());
		$this->assign('nav_curr', 'jiu');
    	$this->_config_seo(array(
            'title' => '9.9包邮 -' .C('ftx_site_name'),
			'keywords' => '9.9包邮,九块邮，九块九包邮',
			'description' => '全场九块九包邮。',
			));
		$this->display('index');
    }
		
}