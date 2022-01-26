package com.ssafy.vue.model.service;

import java.util.Collections;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.vue.model.HouseInfoDto;
import com.ssafy.vue.model.SidoGugunCodeDto;
import com.ssafy.vue.model.mapper.HouseMapMapper;

@Service
public class HouseMapServiceImpl implements HouseMapService {
	
	List<HouseInfoDto> quick;
	
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<SidoGugunCodeDto> getSido() throws Exception {
		return sqlSession.getMapper(HouseMapMapper.class).getSido();
	}

	@Override
	public List<SidoGugunCodeDto> getGugunInSido(String sido) throws Exception {
		return sqlSession.getMapper(HouseMapMapper.class).getGugunInSido(sido);
	}

	@Override
	public List<HouseInfoDto> getDongInGugun(String gugun) throws Exception {
		return sqlSession.getMapper(HouseMapMapper.class).getDongInGugun(gugun);
	}

	@Override
	public List<HouseInfoDto> getAptInDong(String dong) throws Exception {
		List<HouseInfoDto> test;
		test = sqlSession.getMapper(HouseMapMapper.class).getAptInDong(dong);
		quick = sqlSession.getMapper(HouseMapMapper.class).getAptInDong(dong);
		//확인용 foreach
		for(HouseInfoDto t:test) {
			System.out.println("동확인2"+t.toString());
			
		}
		
		//bubble sort
		int size = test.size();
		for(int i = 0; i < size-1; i++) {
			for(int j = 0; j < size-i-1; j++) {
				if(test.get(j).getAptCode() > test.get(j+1).getAptCode()) {
					Collections.swap(test, j, j+1);					
				}
			}
		}

		//quick sort
		quickSort(0, size-1);
		

		for(HouseInfoDto t:test) {
			System.out.println("동확인2"+t.toString());
		}

		
		return test;
	}
	
	public int partition(int low, int high)
	{
	      
	    int pivot = quick.get(high).getAptCode();
	      
	    int i = (low - 1); 
	  
	    for(int j = low; j <= high - 1; j++)
	    {	          
	        if (quick.get(j).getAptCode() < pivot) 
	        {	              
	            i++; 
				Collections.swap(quick, i, j);					
	        }
	    }
		Collections.swap(quick, i+1, high);					
	    return (i + 1);
	}
	
	public void quickSort(int low, int high)
	{
	    if (low < high) 
	    {
	        int pi = partition(low, high);
	  
	        quickSort(low, pi - 1);
	        quickSort(pi + 1, high);
	    }
	}

}
