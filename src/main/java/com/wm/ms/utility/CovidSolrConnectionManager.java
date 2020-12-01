package com.wm.ms.utility;

import java.util.ArrayList;
import java.util.List;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient;

/**
 * 
 * @author Kallol Das
 * 
 * @Description Base class for Covid Solr connection pool manager<br>
 * This can be utilized for creation of connection pooling for 
 * any solr collections with authentication
 * 
 */
public final class CovidSolrConnectionManager {

	private String url;
	private List<SolrClient> connectionPool;
	SolrClient solrClient;
	private List<SolrClient> usedConnections = new ArrayList<>();
	private static CovidSolrConnectionManager manager = null;
	
	public static synchronized CovidSolrConnectionManager create(final String url, final int poolSize)
			throws Exception {

		if (manager == null) {
		  System.out.println("Covid Solr connection pool is being created..");
		List<SolrClient> connectionPool = new ArrayList<>(poolSize);
		System.out.println("Covid Solr connections are being created..");
		for (int i = 0; i < poolSize; i++) {
			connectionPool.add(createConnection(url));
		  } 
		 manager = new CovidSolrConnectionManager(url, connectionPool);
		 System.out.println("Covid Solr connection pool manager is ready to serve..");
		}
		 return manager;
	}

	private CovidSolrConnectionManager(String url, List<SolrClient> connectionPool) {
		super();
		this.url = url;
		this.connectionPool = connectionPool;
	}

	public SolrClient getConnection() {
		SolrClient connection = connectionPool.remove(connectionPool.size() - 1);
		usedConnections.add(connection);
		return connection;
	}

	public boolean releaseConnection(SolrClient connection) {
		connectionPool.add(connection);
		return usedConnections.remove(connection);
	}

	private static SolrClient createConnection(String url) {
		    SolrClient connection = null;
	        connection = new HttpSolrClient.Builder(url).build();		
		return connection;
	}

	public int getSize() {
		return connectionPool.size() + usedConnections.size();
	}

}
