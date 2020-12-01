package com.wm.ms.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrRequest.METHOD;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.params.ModifiableSolrParams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.core.env.Environment;
import com.wm.ms.utility.CovidSolrConnectionManager;
import com.wm.ms.DemoApplication;
import com.wm.ms.model.SearchCommand;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

@Service
public class SearchService {
	private static final Logger LOGGER = LoggerFactory.getLogger(SearchService.class);

    // @Autowired
	// private RabbitTemplate rabbitTemplate;
	
	@Autowired
	private Environment environment;

	@Autowired
	SearchResultTransformer transformerServicer;

	public Map<Object, Object> searchCovidCases(SearchCommand searchCommand, ModelMap model) throws Exception {
		int poolSize = 5;
		String solrUrl = environment.getProperty("solr.base.url");
		
		CovidSolrConnectionManager manager = CovidSolrConnectionManager.create(solrUrl, poolSize);
		ModifiableSolrParams msp = new ModifiableSolrParams();
		SolrQuery solrquery = new SolrQuery();
		List<String> filter = new ArrayList<String>(2);

		msp.set("wt", "json");
		if (searchCommand != null) {
			msp.set("q", searchCommand.getSearchTerm());

			if (StringUtils.equalsIgnoreCase(searchCommand.getSearchTerm(), "*")) {
				msp.set("sort", "numcases asc");
			}

			if (searchCommand.getStartRow() != null) {
				msp.set("start", searchCommand.getStartRow());
			}

			if (searchCommand.getEndRow() != null) {
				msp.set("rows", searchCommand.getEndRow());
			}


			msp.set("fq", filter.stream().toArray(String[]::new));
		}

		LOGGER.info("covid search params -> " + msp.toQueryString());
		//rabbitTemplate.convertAndSend(DemoApplication.topicExchangeName, "foo.bar.baz", "covid search params -> " + msp.toQueryString());
		solrquery.add(msp);
		solrquery.setRequestHandler("/select");

		SolrClient connection = manager.getConnection();
		QueryResponse qr = connection.query(solrquery, METHOD.GET);
		manager.releaseConnection(connection);

		return transformerServicer.getCovidQueryResponseMap(qr);
	}
}
